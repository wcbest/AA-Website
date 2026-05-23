import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("billboard id is required", { status: 400 });
  }

  try {
    const result = await db.execute({
      sql: "SELECT * FROM billboards WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return new NextResponse("Billboard not found", { status: 404 });
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
    return new NextResponse("billboard id is required", { status: 400 });
  }

  const { label, imageUrl } = await req.json();

  if (!label) {
    return new NextResponse("text is required", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("image is required", { status: 400 });
  }

  try {
    await db.execute({
      sql: "UPDATE billboards SET label = ?, image_url = ? WHERE id = ?",
      args: [label, imageUrl, id],
    });

    const result = await db.execute({
      sql: "SELECT * FROM billboards WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("billboard id is required", { status: 400 });
  }

  try {
    await db.execute({
      sql: "DELETE FROM billboards WHERE id = ?",
      args: [id],
    });

    return new NextResponse("billboard has been deleted", { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
