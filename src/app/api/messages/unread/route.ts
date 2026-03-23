import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

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

    const unreadCount = await prisma.message.count({
      where: {
        is_read: false,
        sender_id: { not: payload.id as string },
        booking: {
          OR: [
            { student_id: payload.id as string },
            { residence: { owner_id: payload.id as string } }
          ]
        }
      }
    });

    return NextResponse.json({ count: unreadCount });
  } catch (error) {
    console.error("Get unread messages count error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
