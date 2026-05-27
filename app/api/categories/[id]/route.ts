import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const row = await db.select().from(categories).where(eq(categories.id, id)).get();

    if (!row) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(row, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { label, desc } = await req.json();

  if (!label) {
    return new NextResponse("Please enter category name", { status: 400 });
  }

  try {
    const [row] = await db
      .update(categories)
      .set({ label, desc: desc ?? null })
      .where(eq(categories.id, id))
      .returning();

    return NextResponse.json(row);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.delete(categories).where(eq(categories.id, id));
    return new NextResponse("category has been deleted", { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
