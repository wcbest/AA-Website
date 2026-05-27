import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const existing = await db.select({ email: users.email }).from(users).where(eq(users.email, email)).get();

    if (existing) {
      return new NextResponse("User Already exist!!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    await db.insert(users).values({ id, name, email, password: hashedPassword });

    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
