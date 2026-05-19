import Billboard from "@/models/Billboards";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();

    const billboards = await Billboard.find({});

    return NextResponse.json(billboards, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  await connect();

  const { label, imageUrl } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("Please add an image", { status: 400 });
  }

  const newBilllboard = new Billboard({
    label,
    imageUrl,
  });

  await newBilllboard.save();

  try {
    return NextResponse.json(newBilllboard, {
      status: 200,
    });
  } catch (error) {
    console.log("[BillBOARD_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
