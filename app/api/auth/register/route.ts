import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import User from "@/models/Users";
import connect from "@/utils/db";

export const POST = async (req: Request, _res: Response) => {
  await connect();
  try {
    const { name, email, password } = await req.json();

    // checking if user already exists in the database
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return new NextResponse("User Already exist!!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
