import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // booking id
    const body = await req.json();
    const { status } = body; // 'accepted', 'rejected', or 'cancelled'

    if (!["accepted", "rejected", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { residence: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Role-based authorization
    if (payload.role === "owner") {
      if (booking.residence?.owner_id !== payload.id) {
        return NextResponse.json({ error: "Unauthorized: Not your property" }, { status: 403 });
      }
      if (status === "cancelled") {
        return NextResponse.json({ error: "Owners cannot cancel. Use reject." }, { status: 400 });
      }
    } else if (payload.role === "student") {
      if (booking.student_id !== payload.id) {
        return NextResponse.json({ error: "Unauthorized: Not your booking" }, { status: 403 });
      }
      if (status !== "cancelled") {
        return NextResponse.json({ error: "Students can only cancel bookings." }, { status: 400 });
      }
      if (booking.status !== "pending") {
         return NextResponse.json({ error: "Can only cancel pending bookings." }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });
    }

    // Update status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        student: { select: { full_name: true, email: true } },
        residence: { select: { title: true } }
      }
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
