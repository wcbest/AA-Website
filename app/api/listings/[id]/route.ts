import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { listings } from "@/db/schema";

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { title, description, price, type, location, image_url, published } = await req.json();
    const { id } = params;

    if (!title || !type) {
      return new NextResponse("Title and type are required", { status: 400 });
    }

    const [row] = await db
      .update(listings)
      .set({
        title,
        description: description ?? null,
        price: price ?? null,
        type,
        location: location ?? null,
        imageUrl: image_url ?? null,
        published: published ? 1 : 0,
      })
      .where(eq(listings.id, id))
      .returning();

    if (!row) {
      return new NextResponse("Listing not found", { status: 404 });
    }

    return NextResponse.json(row, { status: 200 });
  } catch (error) {
    console.log("[LISTING_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { published } = await req.json();
    const { id } = params;

    await db.update(listings).set({ published: published ? 1 : 0 }).where(eq(listings.id, id));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[LISTING_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (_req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    await db.delete(listings).where(eq(listings.id, id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[LISTING_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
