import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const GET = async (_req: Request, _res: Response) => {
  try {
    const result = await db.execute(`
      SELECT p.id, p.name, p.desc, p.image_url, p.link, p.category_id, p.created_at,
             c.id as cat_id, c.label as cat_label, c.desc as cat_desc
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    const products = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      desc: row.desc,
      imageUrl: row.image_url,
      link: row.link,
      created_at: row.created_at,
      category: row.cat_id
        ? { id: row.cat_id, label: row.cat_label, desc: row.cat_desc }
        : null,
    }));

    return NextResponse.json(products, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, _res: Response) => {
  const { name, desc, imageUrl, link, category } = await req.json();

  if (!name) {
    return new NextResponse("Please enter product name", { status: 400 });
  }

  if (!desc) {
    return new NextResponse("Please enter description", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("Please add an image", { status: 400 });
  }

  if (!link) {
    return new NextResponse("Please enter the product link", { status: 400 });
  }

  if (!category) {
    return new NextResponse("Please add the product to a category", {
      status: 400,
    });
  }

  try {
    const id = crypto.randomUUID();
    await db.execute({
      sql: "INSERT INTO products (id, name, desc, image_url, link, category_id) VALUES (?, ?, ?, ?, ?, ?)",
      args: [id, name, desc, imageUrl, link, category],
    });

    const result = await db.execute({
      sql: `
        SELECT p.id, p.name, p.desc, p.image_url, p.link, p.category_id, p.created_at,
               c.id as cat_id, c.label as cat_label, c.desc as cat_desc
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?
      `,
      args: [id],
    });

    const row = result.rows[0];
    const product = {
      id: row.id,
      name: row.name,
      desc: row.desc,
      imageUrl: row.image_url,
      link: row.link,
      created_at: row.created_at,
      category: row.cat_id
        ? { id: row.cat_id, label: row.cat_label, desc: row.cat_desc }
        : null,
    };

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
