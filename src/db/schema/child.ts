import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { users } from './auth';

export const child = pgTable('child', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  parentId: uuid('parent_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
  apiKey: varchar('key', { length: 256 }),
});
export const locations = pgTable('locations', {
  id: uuid('uuid1').defaultRandom().primaryKey(),
  longitude: numeric('longitude'),
  latitude: numeric('latitude'),
  userId: uuid('user_id'),
});

export const childPIN = pgTable(
  'child_pin',
  {
    childId: uuid('child_id')
      .notNull()
      .references(() => child.id, { onDelete: 'cascade' }),
    pin: integer('pin'),
    expires: timestamp('expires').default(sql`now() + interval '1 hour'`),
  },
  (childPIN) => ({
    composePk: primaryKey(childPIN.childId, childPIN.pin),
  })
);
export const childLocations = relations(child, ({ many }) => ({
  locations: many(locations),
}));
export const locationsRelations = relations(locations, ({ one }) => ({
  author: one(child, {
    fields: [locations.userId],
    references: [child.id],
  }),
}));
