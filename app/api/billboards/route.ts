import { NextResponse } from "next/server";
import Billboard from "@/models/Billboards";
import connect from "@/utils/db";

export const GET = async (_req: Request, _res: Response) => {
  try {
    await connect();

    const billboards = await Billboard.find({});

    return NextResponse.json(billboards, {
      status: 200,
    });
  } catch (_err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, _res: Response) => {
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
