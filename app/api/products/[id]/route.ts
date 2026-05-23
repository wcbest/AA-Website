import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

const PRODUCT_WITH_CATEGORY_SQL = `
  SELECT p.id, p.name, p.desc, p.image_url, p.link, p.category_id, p.created_at,
         c.id as cat_id, c.label as cat_label, c.desc as cat_desc
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE p.id = ?
`;

function mapRow(row: Record<string, unknown>) {
  return {
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
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

  try {
    const result = await db.execute({
      sql: PRODUCT_WITH_CATEGORY_SQL,
      args: [id],
    });

    if (result.rows.length === 0) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(mapRow(result.rows[0] as Record<string, unknown>), { status: 200 });
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
    return new NextResponse("product id is required", { status: 400 });
  }

  const { name, link, desc, imageUrl, category } = await req.json();

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

  try {
    await db.execute({
      sql: "UPDATE products SET name = ?, desc = ?, image_url = ?, link = ?, category_id = ? WHERE id = ?",
      args: [name, desc, imageUrl, link, category ?? null, id],
    });

    const result = await db.execute({
      sql: PRODUCT_WITH_CATEGORY_SQL,
      args: [id],
    });

    return NextResponse.json(mapRow(result.rows[0] as Record<string, unknown>));
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

  try {
    await db.execute({
      sql: "DELETE FROM products WHERE id = ?",
      args: [id],
    });

    return new NextResponse("Product has been deleted", { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
