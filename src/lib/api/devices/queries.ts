import { db } from "@/server/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type DeviceId, deviceIdSchema, devices } from "@/server/db/schema/devices";
import { children } from "@/server/db/schema/children";

export const getDevices = async () => {
  const { session } = await getUserAuth();
  const d = await db.select({ device: devices, child: children }).from(devices).leftJoin(children, eq(devices.childId, children.id)).where(eq(devices.userId, session?.user.id!));
  return { devices: d };
};

export const getDeviceById = async (id: DeviceId) => {
  const { session } = await getUserAuth();
  const { id: deviceId } = deviceIdSchema.parse({ id });
  const [d] = await db.select().from(devices).where(and(eq(devices.id, deviceId), eq(devices.userId, session?.user.id!))).leftJoin(children, eq(devices.childId, children.id));
  return { device: d };
};

