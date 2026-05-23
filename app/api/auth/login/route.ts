import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "@/utils/turso";

export const POST = async (req: Request, _res: Response) => {
  const { email, password } = await req.json();

  const result = await db.execute({
    sql: "SELECT id, name, email, password FROM users WHERE email = ?",
    args: [email],
  });

  const user = result.rows[0];

  if (!user) {
    return new NextResponse("Invalid Email or Password", { status: 400 });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password as string,
  );

  if (!validPassword) {
    return new NextResponse("Invalid Email or Password", { status: 400 });
  }

  try {
    const { password: _pw, ...safeUser } = user as Record<string, unknown>;
    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
