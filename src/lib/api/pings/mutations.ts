import { db } from "@/server/db/index";
import { and, eq } from "drizzle-orm";
import {
  type PingId,
  type NewPingParams,
  type UpdatePingParams,
  updatePingSchema,
  insertPingSchema,
  pings,
  pingIdSchema,
} from "@/server/db/schema/pings";
import { getUserAuth } from "@/lib/auth/utils";

export const createPing = async (ping: NewPingParams, userId: string) => {
  const newPing = insertPingSchema.parse({
    ...ping,
    userId: userId,
  });
  try {
    const [p] = await db.insert(pings).values(newPing).returning();
    return { ping: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePing = async (id: PingId, ping: UpdatePingParams) => {
  const { session } = await getUserAuth();
  const { id: pingId } = pingIdSchema.parse({ id });
  const newPing = updatePingSchema.parse({
    ...ping,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db
      .update(pings)
      .set(newPing)
      .where(and(eq(pings.id, pingId), eq(pings.userId, session?.user.id!)))
      .returning();
    return { ping: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePing = async (id: PingId) => {
  const { session } = await getUserAuth();
  const { id: pingId } = pingIdSchema.parse({ id });
  try {
    const [p] = await db
      .delete(pings)
      .where(and(eq(pings.id, pingId), eq(pings.userId, session?.user.id!)))
      .returning();
    return { ping: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
