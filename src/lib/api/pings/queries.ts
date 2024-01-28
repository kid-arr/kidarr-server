import { db } from "@/server/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type PingId, pingIdSchema, pings } from "@/server/db/schema/pings";
import { devices } from "@/server/db/schema/devices";

export const getPings = async () => {
  const { session } = await getUserAuth();
  const p = await db.select({ ping: pings, device: devices }).from(pings).leftJoin(devices, eq(pings.deviceId, devices.id)).where(eq(pings.userId, session?.user.id!));
  return { pings: p };
};

export const getPingById = async (id: PingId) => {
  const { session } = await getUserAuth();
  const { id: pingId } = pingIdSchema.parse({ id });
  const [p] = await db.select().from(pings).where(and(eq(pings.id, pingId), eq(pings.userId, session?.user.id!))).leftJoin(devices, eq(pings.deviceId, devices.id));
  return { ping: p };
};

