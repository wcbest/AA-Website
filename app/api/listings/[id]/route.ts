import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const { title, description, price, type, location, image_url } =
      await req.json();
    const { id } = params;

    if (!title || !type) {
      return new NextResponse("Title and type are required", { status: 400 });
    }

    await db.execute({
      sql: "UPDATE listings SET title = ?, description = ?, price = ?, type = ?, location = ?, image_url = ? WHERE id = ?",
      args: [title, description ?? null, price ?? null, type, location ?? null, image_url ?? null, id],
    });

    const result = await db.execute({
      sql: "SELECT id, title, description, price, type, location, image_url, created_at FROM listings WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return new NextResponse("Listing not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log("[LISTING_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;

    await db.execute({
      sql: "DELETE FROM listings WHERE id = ?",
      args: [id],
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[LISTING_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
