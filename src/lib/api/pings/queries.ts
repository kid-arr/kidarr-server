import { db } from "@/server/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type PingId, pingIdSchema, pings } from "@/server/db/schema/pings";

export const getPings = async () => {
  const { session } = await getUserAuth();
  const p = await db.query.pings.findMany({
    where: (pings, { eq }) => eq(pings.userId, session?.user.id!),
  });
  return { pings: p };
};

export const getPingById = async (id: PingId) => {
  const { session } = await getUserAuth();
  const { id: pingId } = pingIdSchema.parse({ id });
  const p = await db.query.pings.findFirst({
    where: (pings, { eq, and }) =>
      and(eq(pings.id, pingId), eq(pings.userId, session?.user.id!)),
  });

  return { ping: p };
};
