import { NextResponse } from "next/server";
import Category from "@/models/Categories";
import Product from "@/models/Products";
import connect from "@/utils/db";

export const GET = async (_req: Request, _res: Response) => {
  try {
    await connect();

    const categories = await Category.find({}).populate({
      path: "products",
      model: Product,
    });

    return NextResponse.json(categories, {
      status: 200,
    });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, _res: Response) => {
  await connect();

  const { label, desc } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  const category = new Category({
    label,
    desc,
  });

  await category.save();

  try {
    return NextResponse.json(category, {
      status: 200,
    });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
