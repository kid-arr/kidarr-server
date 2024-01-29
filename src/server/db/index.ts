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
  pings,
  childrenRelations,
  deviceRelations,
  pingRelations,
} from "@/server/db/schema/_root";

export const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, {
  schema: {
    accounts,
    sessions,
    users,
    children,
    devices,
    pings,
    verificationTokens,
    childrenRelations,
    deviceRelations,
    pingRelations,
  },
});
