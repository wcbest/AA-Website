import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("category id is required", { status: 400 });
  }

  try {
    const result = await db.execute({
      sql: "SELECT * FROM categories WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("category id is required", { status: 400 });
  }

  const { label, desc } = await req.json();

  if (!label) {
    return new NextResponse("Please enter category name", { status: 400 });
  }

  try {
    await db.execute({
      sql: "UPDATE categories SET label = ?, desc = ? WHERE id = ?",
      args: [label, desc ?? null, id],
    });

    const result = await db.execute({
      sql: "SELECT * FROM categories WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("category id is required", { status: 400 });
  }

  try {
    await db.execute({
      sql: "DELETE FROM categories WHERE id = ?",
      args: [id],
    });

    return new NextResponse("category has been deleted", { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
