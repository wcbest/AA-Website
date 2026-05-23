import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const POST = async (req: Request, _res: Response) => {
  try {
    const { name, email, password } = await req.json();

    const existing = await db.execute({
      sql: "SELECT email FROM users WHERE email = ?",
      args: [email],
    });

    if (existing.rows.length > 0) {
      return new NextResponse("User Already exist!!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    await db.execute({
      sql: "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      args: [id, name, email, hashedPassword],
    });

    return new NextResponse("User has been created", { status: 201 });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
