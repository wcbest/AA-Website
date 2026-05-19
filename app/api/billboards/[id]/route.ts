import Billboard from "@/models/Billboards";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("billboard id is required", { status: 400 });
  }

  const billboard = await Billboard.findById(id);

  try {
    return NextResponse.json(billboard, {
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

  const { label, imageUrl } = body;

  if (!id) {
    return new NextResponse("id is required", { status: 400 });
  }

  if (!label) {
    return new NextResponse("text is required", { status: 400 });
  }

  if (!imageUrl) {
    return new NextResponse("image is required", { status: 400 });
  }

  console.log(id);

  const updateBillboard = await Billboard.findByIdAndUpdate(
    { _id: id },
    {
      label,
      imageUrl,
    },
    {
      new: true,
    }
  );
  console.log(updateBillboard);

  try {
    return NextResponse.json(updateBillboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
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
    return new NextResponse("billboard id is required", { status: 400 });
  }

  const billboard = await Billboard.findById(id);

  if (billboard.id === id) {
    await billboard.deleteOne();
    return new NextResponse("billboard has been deleted", { status: 200 });
  }
  try {
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
