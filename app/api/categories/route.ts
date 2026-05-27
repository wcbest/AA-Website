import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products } from "@/db/schema";

export const GET = async () => {
  try {
    const cats = await db.select().from(categories).orderBy(desc(categories.createdAt));

    const result = await Promise.all(
      cats.map(async (cat) => {
        const prods = await db.select().from(products).where(eq(products.categoryId, cat.id));
        return { ...cat, products: prods };
      }),
    );

    return NextResponse.json(result, { status: 200 });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { label, desc: descValue } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  try {
    const id = crypto.randomUUID();
    const [row] = await db.insert(categories).values({ id, label, desc: descValue ?? null }).returning();
    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
