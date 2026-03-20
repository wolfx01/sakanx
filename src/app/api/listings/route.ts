import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    // Verify auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Check user is an owner
    if (payload.role !== "owner") {
      return NextResponse.json(
        { error: "Only property owners can create listings" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, city, address, price_per_month, category } =
      body;

    // Validation
    if (!title || !city || !price_per_month) {
      return NextResponse.json(
        { error: "Title, city, and price are required" },
        { status: 400 }
      );
    }

    // Create listing
    const residence = await prisma.residence.create({
      data: {
        owner_id: payload.id as string,
        title,
        description,
        city,
        address,
        price_per_month,
        category,
      },
    });

    // Handle base64 image uploads
    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure upload directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const imagePromises = body.images.map(async (base64Str: string, index: number) => {
        // base64Str typically looks like: "data:image/jpeg;base64,/9j/4AAQSkZJ..."
        const matches = base64Str.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
        
        if (!matches || matches.length !== 3) {
          throw new Error("Invalid base64 string format");
        }

        const extension = matches[1] === "jpeg" ? "jpg" : matches[1];
        const imageData = matches[2];
        const buffer = Buffer.from(imageData, "base64");
        
        // Generate a random filename
        const filename = `${residence.id}-${Date.now()}-${index}.${extension}`;
        const filepath = path.join(uploadDir, filename);

        // Write file to public/uploads
        await fs.writeFile(filepath, buffer);

        // Create DB record
        return prisma.residenceImage.create({
          data: {
            residence_id: residence.id,
            image_url: `/uploads/${filename}`,
            is_main: index === 0, // First image is the main one
          },
        });
      });

      await Promise.all(imagePromises);
    }

    return NextResponse.json(
      { message: "Listing created successfully", residence },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create listing error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Build query filters
    const where: any = {};
    if (city && city !== "all") where.city = city;
    if (category && category !== "all") where.category = category;
    if (minPrice || maxPrice) {
      where.price_per_month = {};
      if (minPrice) where.price_per_month.gte = parseFloat(minPrice);
      if (maxPrice) where.price_per_month.lte = parseFloat(maxPrice);
    }

    const listings = await prisma.residence.findMany({
      where,
      orderBy: { created_at: "desc" },
      include: {
        owner: {
          select: { full_name: true },
        },
        images: {
          select: { image_url: true, is_main: true },
          orderBy: { is_main: "desc" }
        }
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Fetch listings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
