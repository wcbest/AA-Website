import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  const user = await db.select().from(users).where(eq(users.email, email)).get();

  if (!user) {
    return new NextResponse("Invalid Email or Password", { status: 400 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return new NextResponse("Invalid Email or Password", { status: 400 });
  }

  try {
    const { password: _pw, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
