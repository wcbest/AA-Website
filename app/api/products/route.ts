import { NextResponse } from "next/server";
import Category from "@/models/Categories";
import Product from "@/models/Products";
import connect from "@/utils/db";

export const GET = async (_req: Request, _res: Response) => {
  try {
    await connect();

    const product = await Product.find({}).populate({
      path: "categories",
      model: Category,
    });

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, _res: Response) => {
  await connect();

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

  const product = new Product({
    name,
    desc,
    imageUrl,
    link,
    category,
  });

  // Add category in the product
  await product.categories.push(category);

  // Add the category ID to the products array
  await Category.findByIdAndUpdate(category, {
    $push: { products: product._id },
  });

  await product.save();

  try {
    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
