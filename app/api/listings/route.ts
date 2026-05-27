import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const GET = async () => {
  try {
    const result = await db.execute(
      "SELECT id, title, description, price, type, location, image_url, created_at FROM listings ORDER BY created_at DESC",
    );
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.log("[LISTINGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, description, price, type, location, image_url } =
      await req.json();

    if (!title || !type) {
      return new NextResponse("Title and type are required", { status: 400 });
    }

    const id = crypto.randomUUID();

    await db.execute({
      sql: "INSERT INTO listings (id, title, description, price, type, location, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [id, title, description ?? null, price ?? null, type, location ?? null, image_url ?? null],
    });

    const result = await db.execute({
      sql: "SELECT id, title, description, price, type, location, image_url, created_at FROM listings WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.log("[LISTINGS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
