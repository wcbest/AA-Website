import path from "node:path";
import { createClient } from "@libsql/client";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const [, , email, password, name = "Admin"] = process.argv;

if (!email || !password) {
  console.error("Usage: npx tsx scripts/seed-admin.ts <email> <password> [name]");
  process.exit(1);
}

const url = process.env.TURSO_URL;
const authToken = process.env.TURSO_TOKEN;

if (!url || !authToken) {
  console.error("TURSO_URL and TURSO_TOKEN must be set in .env.local");
  process.exit(1);
}

const db = createClient({ url, authToken });

async function main() {
  const existing = await db.execute({
    sql: "SELECT email FROM users WHERE email = ?",
    args: [email],
  });

  if (existing.rows.length > 0) {
    console.error(`User with email "${email}" already exists.`);
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();

  await db.execute({
    sql: "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    args: [id, name, email, hashedPassword],
  });

  console.log(`Admin user "${email}" created successfully.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
