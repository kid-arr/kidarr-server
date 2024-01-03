import {
  timestamp,
  text,
  primaryKey,
  integer,
  pgTable,
  uuid,
  varchar,
  pgSchema,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations, sql } from 'drizzle-orm';

//#region auth
//TODO: use this schema once https://github.com/drizzle-team/drizzle-orm/issues/636 is fixed
const authSchema = pgSchema('auth');
export const users = pgTable('user', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid
    ()`),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
//#endregion auth

export const userRelations = relations(users, ({ many }) => ({
  children: many(child),
}));

//#region child
export const child = pgTable('child', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid
    ()`),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
  avatar: varchar('avatar', { length: 256 }),
  apiKey: varchar('key', { length: 256 }),
  parentId: uuid('parent_id').notNull(),
});
export const childRelations = relations(child, ({ one, many }) => ({
  parent: one(users, {
    fields: [child.parentId],
    references: [users.id],
  }),
  devices: many(device),
}));

export const device = pgTable('device', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid
    ()`),
  deviceId: varchar('device_id').notNull().unique(),
  childId: uuid('child_id').notNull(),
  deviceName: varchar('device_name').notNull(),
  apiKey: varchar('api_key').notNull().unique(),
  //TODO: make the device request/pin a separate table and enforce the expiry
  pin: integer('pin').notNull(),
  expires: timestamp('expires').default(sql`now
  () + interval '1 hour'`),
});
export const deviceRelations = relations(device, ({ one, many }) => ({
  child: one(child, {
    fields: [device.childId],
    references: [child.id],
  }),
  pings: many(ping),
}));

export const ping = pgTable('ping', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid
    ()`),
  deviceId: uuid('device_id').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  timestamp: timestamp('timestamp').notNull(),
});
export const pingRelations = relations(ping, ({ one, many }) => ({
  device: one(device, {
    fields: [ping.deviceId],
    references: [device.id],
  }),
}));
