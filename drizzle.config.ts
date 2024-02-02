import "dotenv/config";

import type { Config } from "drizzle-kit";
import { env } from "@/env.cjs";

export default {
  schema: "./src/server/db/schema",
  out: "./src/server/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
