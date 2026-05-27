import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products } from "@/db/schema";

const withCategory = {
  id: products.id,
  name: products.name,
  desc: products.desc,
  imageUrl: products.imageUrl,
  link: products.link,
  createdAt: products.createdAt,
  category: {
    id: categories.id,
    label: categories.label,
    desc: categories.desc,
  },
};

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const [row] = await db
      .select(withCategory)
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));

    if (!row) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(row, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, link, desc: descValue, imageUrl, category } = await req.json();

  if (!name) return new NextResponse("Please enter product name", { status: 400 });
  if (!descValue) return new NextResponse("Please enter description", { status: 400 });
  if (!imageUrl) return new NextResponse("Please add an image", { status: 400 });
  if (!link) return new NextResponse("Please enter the product link", { status: 400 });

  try {
    await db
      .update(products)
      .set({ name, desc: descValue, imageUrl, link, categoryId: category ?? null })
      .where(eq(products.id, id));

    const [row] = await db
      .select(withCategory)
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));

    return NextResponse.json(row);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.delete(products).where(eq(products.id, id));
    return new NextResponse("Product has been deleted", { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
