import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { billboards } from "@/db/schema";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const row = await db.select().from(billboards).where(eq(billboards.id, id)).get();

    if (!row) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    return NextResponse.json(row, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { label, imageUrl } = await req.json();

  if (!label) {
    return new NextResponse("text is required", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("image is required", { status: 400 });
  }

  try {
    const [row] = await db
      .update(billboards)
      .set({ label, imageUrl })
      .where(eq(billboards.id, id))
      .returning();

    return NextResponse.json(row);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.delete(billboards).where(eq(billboards.id, id));
    return new NextResponse("billboard has been deleted", { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
