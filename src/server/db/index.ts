import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as extended from "~/server/db/schema/_root";
import { env } from "@/env";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema: { ...schema, ...extended } });

// console.log('DRIZZLE', 'migrating');
// migrate(db, { migrationsFolder: 'drizzle' })
//   .then(() => console.log('DRIZZLE', 'migrated'));
