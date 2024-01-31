import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { children } from "./children";
import { users } from "@/server/db/schema/auth";
import { type getDevices } from "@/lib/api/devices/queries";

import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { pings } from "./pings";

export const devices = pgTable("devices", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 256 }).notNull(),
  deviceId: varchar("device_id", { length: 256 }).notNull(),
  childId: varchar("child_id", { length: 256 })
    .references(() => children.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});
export const deviceRelations = relations(devices, ({ one, many }) => ({
  pings: many(pings),
  child: one(children, {
    fields: [devices.childId],
    references: [children.id],
  }),
}));

// Schema for devices - used to validate API requests
export const insertDeviceSchema = createInsertSchema(devices);

export const insertDeviceParams = createSelectSchema(devices, {
  childId: z.coerce.string().min(1),
}).omit({
  id: true,
  userId: true,
});

export const updateDeviceSchema = createSelectSchema(devices);

export const updateDeviceParams = createSelectSchema(devices, {
  childId: z.coerce.string().min(1),
}).omit({
  userId: true,
});

export const deviceIdSchema = updateDeviceSchema.pick({ id: true });

// Types for devices - used to type API request params and within Components
export type Device = z.infer<typeof updateDeviceSchema>;
export type NewDevice = z.infer<typeof insertDeviceSchema>;
export type NewDeviceParams = z.infer<typeof insertDeviceParams>;
export type UpdateDeviceParams = z.infer<typeof updateDeviceParams>;
export type DeviceId = z.infer<typeof deviceIdSchema>["id"];

// this type infers the return from getDevices() - meaning it will include any joins
export type CompleteDevice = Awaited<
  ReturnType<typeof getDevices>
>["devices"][number];
