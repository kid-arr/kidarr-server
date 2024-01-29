import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env.mjs";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
  children,
  devices,
  childrenRelations,
  deviceRelations,
  pingRelations,
} from "@/server/db/schema/_root";

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, {
  schema: {
    devices,
    children,
    users,
    accounts,
    sessions,
    verificationTokens,
    childrenRelations,
    deviceRelations,
    pingRelations,
  },
});
