import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products } from "@/db/schema";

export const GET = async () => {
  try {
    const rows = await db
      .select({
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
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(desc(products.createdAt));

    return NextResponse.json(rows, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { name, desc: descValue, imageUrl, link, category } = await req.json();

  if (!name) return new NextResponse("Please enter product name", { status: 400 });
  if (!descValue) return new NextResponse("Please enter description", { status: 400 });
  if (!imageUrl) return new NextResponse("Please add an image", { status: 400 });
  if (!link) return new NextResponse("Please enter the product link", { status: 400 });
  if (!category) return new NextResponse("Please add the product to a category", { status: 400 });

  try {
    const id = crypto.randomUUID();
    await db.insert(products).values({ id, name, desc: descValue, imageUrl, link, categoryId: category });

    const [row] = await db
      .select({
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
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
