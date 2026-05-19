import Product from "@/models/Products";
import Category from "@/models/Categories";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

  const product = await Product.findById(id);

  try {
    return NextResponse.json(product, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("billboard id is required", { status: 400 });
  }

  const body = await req.json();

  const { name, link, desc, imageUrl, category } = body;

  if (!id) {
    return new NextResponse("id is required", { status: 400 });
  }

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

  const updateProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      link,
      desc,
      imageUrl,
      category,
    },
    {
      new: true,
    }
  );

  try {
    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

  const product = await Product.findById(id);

  if (product.id === id) {
    await product.deleteOne();
    return new NextResponse("Product has been deleted", { status: 200 });
  }
  try {
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
