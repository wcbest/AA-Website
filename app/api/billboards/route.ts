import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { billboards } from "@/db/schema";

export const GET = async () => {
  try {
    const rows = await db.select().from(billboards).orderBy(desc(billboards.createdAt));
    return NextResponse.json(rows, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { label, imageUrl } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("Please add an image", { status: 400 });
  }

  try {
    const id = crypto.randomUUID();
    const [row] = await db.insert(billboards).values({ id, label, imageUrl }).returning();
    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
