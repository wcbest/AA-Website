import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const GET = async (_req: Request, _res: Response) => {
  try {
    const result = await db.execute(
      "SELECT * FROM billboards ORDER BY created_at DESC",
    );
    return NextResponse.json(result.rows, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, _res: Response) => {
  const { label, imageUrl } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("Please add an image", { status: 400 });
  }

  try {
    const id = crypto.randomUUID();
    await db.execute({
      sql: "INSERT INTO billboards (id, label, image_url) VALUES (?, ?, ?)",
      args: [id, label, imageUrl],
    });

    const result = await db.execute({
      sql: "SELECT * FROM billboards WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
