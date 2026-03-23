import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { residence: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.student_id !== payload.id && booking.residence?.owner_id !== payload.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const messages = await prisma.message.findMany({
      where: { booking_id: id },
      include: {
        sender: {
          select: { id: true, full_name: true, role: true },
        },
      },
      orderBy: { created_at: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { residence: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.student_id !== payload.id && booking.residence?.owner_id !== payload.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const message = await prisma.message.create({
      data: {
        booking_id: id,
        sender_id: payload.id as string,
        content,
      },
      include: {
        sender: {
          select: { id: true, full_name: true, role: true },
        },
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Create message error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { residence: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.student_id !== payload.id && booking.residence?.owner_id !== payload.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.message.updateMany({
      where: {
        booking_id: id,
        sender_id: { not: payload.id as string },
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update messages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
