import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { users } from "@/server/db/schema/auth";
import { type getChildren } from "@/lib/api/children/queries";

import { randomUUID } from "crypto";

export const children = pgTable("children", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  avatar: varchar("avatar", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

// Schema for children - used to validate API requests
export const insertChildSchema = createInsertSchema(children);

export const insertChildParams = createSelectSchema(children, {}).omit({
  id: true,
  userId: true,
});

export const updateChildSchema = createSelectSchema(children);

export const updateChildParams = createSelectSchema(children, {}).omit({
  userId: true,
});

export const childIdSchema = updateChildSchema.pick({ id: true });

// Types for children - used to type API request params and within Components
export type Child = z.infer<typeof updateChildSchema>;
export type NewChild = z.infer<typeof insertChildSchema>;
export type NewChildParams = z.infer<typeof insertChildParams>;
export type UpdateChildParams = z.infer<typeof updateChildParams>;
export type ChildId = z.infer<typeof childIdSchema>["id"];

// this type infers the return from getChildren() - meaning it will include any joins
export type CompleteChild = Awaited<
  ReturnType<typeof getChildren>
>["children"][number];
