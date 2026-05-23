import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const GET = async (_req: Request, _res: Response) => {
  try {
    const catResult = await db.execute(
      "SELECT * FROM categories ORDER BY created_at DESC",
    );

    const categories = await Promise.all(
      catResult.rows.map(async (cat) => {
        const prodResult = await db.execute({
          sql: "SELECT * FROM products WHERE category_id = ?",
          args: [cat.id],
        });
        return { ...cat, products: prodResult.rows };
      }),
    );

    return NextResponse.json(categories, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, _res: Response) => {
  const { label, desc } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  try {
    const id = crypto.randomUUID();
    await db.execute({
      sql: "INSERT INTO categories (id, label, desc) VALUES (?, ?, ?)",
      args: [id, label, desc ?? null],
    });

    const result = await db.execute({
      sql: "SELECT * FROM categories WHERE id = ?",
      args: [id],
    });

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
