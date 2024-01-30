import { real, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { devices } from "./devices";
import { users } from "@/server/db/schema/auth";
import { type getPings } from "@/lib/api/pings/queries";

import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";

export const pings = pgTable("pings", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  deviceId: varchar("device_id", { length: 256 })
    .references(() => devices.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});
export const pingRelations = relations(pings, ({ one }) => ({
  device: one(devices, {
    fields: [pings.deviceId],
    references: [devices.id],
  }),
}));
// Schema for pings - used to validate API requests
export const insertPingSchema = createInsertSchema(pings);

export const insertPingParams = createSelectSchema(pings, {
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  deviceId: z.coerce.string().min(1),
}).omit({
  id: true,
  userId: true,
  timestamp: true,
});

export const updatePingSchema = createSelectSchema(pings);

export const updatePingParams = createSelectSchema(pings, {
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  deviceId: z.coerce.string().min(1),
}).omit({
  userId: true,
  timestamp: true,
});

export const pingIdSchema = updatePingSchema.pick({ id: true });

// Types for pings - used to type API request params and within Components
export type Ping = z.infer<typeof updatePingSchema>;
export type NewPing = z.infer<typeof insertPingSchema>;
export type NewPingParams = z.infer<typeof insertPingParams>;
export type UpdatePingParams = z.infer<typeof updatePingParams>;
export type PingId = z.infer<typeof pingIdSchema>["id"];

// this type infers the return from getPings() - meaning it will include any joins
export type CompletePing = Awaited<
  ReturnType<typeof getPings>
>["pings"][number];
