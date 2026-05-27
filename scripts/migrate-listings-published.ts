import path from "node:path";
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const url = process.env.TURSO_URL;
const authToken = process.env.TURSO_TOKEN;

if (!url || !authToken) {
  console.error("TURSO_URL and TURSO_TOKEN must be set in .env.local");
  process.exit(1);
}

const db = createClient({ url, authToken });

async function main() {
  await db.execute(
    "ALTER TABLE listings ADD COLUMN published INTEGER NOT NULL DEFAULT 0",
  );
  console.log("Added 'published' column to listings table.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
