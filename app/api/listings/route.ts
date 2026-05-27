import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { listings } from "@/db/schema";

export const GET = async (req: NextRequest) => {
  try {
    const publishedOnly = req.nextUrl.searchParams.get("published") === "true";
    const rows = await db
      .select()
      .from(listings)
      .where(publishedOnly ? eq(listings.published, 1) : undefined)
      .orderBy(desc(listings.createdAt));
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.log("[LISTINGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, description, price, type, location, image_url, published } = await req.json();

    if (!title || !type) {
      return new NextResponse("Title and type are required", { status: 400 });
    }

    const id = crypto.randomUUID();

    const [row] = await db
      .insert(listings)
      .values({
        id,
        title,
        description: description ?? null,
        price: price ?? null,
        type,
        location: location ?? null,
        imageUrl: image_url ?? null,
        published: published ? 1 : 0,
      })
      .returning();

    return NextResponse.json(row, { status: 201 });
  } catch (error) {
    console.log("[LISTINGS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
