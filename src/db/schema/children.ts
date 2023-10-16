import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const children = pgTable('children', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar('name', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
});
export const locations = pgTable('locations', {
  id: uuid('uuid1').defaultRandom().primaryKey(),
  longitude: numeric('longitude'),
  latitude: numeric('latitude'),
  userId: uuid('user_id'),
});
export const childrenLocations = relations(children, ({ many }) => ({
  locations: many(locations),
}));
export const locationsRelations = relations(locations, ({ one }) => ({
  author: one(children, {
    fields: [locations.userId],
    references: [children.id],
  }),
}));
