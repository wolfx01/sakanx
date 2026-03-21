import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 1. Check Authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Parse Body
    const body = await req.json();
    const { residenceId, message } = body;

    if (!residenceId) {
      return NextResponse.json({ error: "Residence ID is required" }, { status: 400 });
    }

    // 3. Prevent duplicate bookings (Spam prevention)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        residence_id: residenceId,
        student_id: payload.id as string,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "You have already sent a request for this property." },
        { status: 400 }
      );
    }

    // 4. Create Booking
    const booking = await prisma.booking.create({
      data: {
        residence_id: residenceId,
        student_id: payload.id as string,
        message: message || "I am interested in booking this property.",
        status: "pending",
      },
    });

    return NextResponse.json(
      { message: "Booking request sent successfully!", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const residenceId = searchParams.get("residenceId");

    let whereClause: any = {};

    // If a specific residence is provided, check if the current student has booked it
    if (residenceId) {
      whereClause = {
        residence_id: residenceId,
        student_id: payload.id as string,
      };
    } else if (payload.role === "student") {
      // Get all bookings for the student
      whereClause = { student_id: payload.id as string };
    } else {
      // Get all bookings for the owner's properties
      const ownerResidences = await prisma.residence.findMany({
        where: { owner_id: payload.id as string },
        select: { id: true }
      });
      whereClause = {
        residence_id: { in: ownerResidences.map(r => r.id) }
      };
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        residence: {
          select: { title: true, city: true, price_per_month: true }
        },
        student: {
          select: { full_name: true, email: true, phone: true }
        }
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
