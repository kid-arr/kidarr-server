import {
  timestamp,
  text,
  primaryKey,
  integer,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations, sql } from 'drizzle-orm';

//#region auth

export const users = pgTable('user', {
  id: uuid('id').notNull().primaryKey(),
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
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
//#endregion auth

//#region child
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

export const childDevices = relations(child, ({ many }) => ({
  devices: many(device),
}));
//#endregion child
//#region device
export const device = pgTable(
  'device',
  {
    childId: uuid('child_id')
      .notNull()
      .references(() => child.id, { onDelete: 'cascade' }),
    pin: integer('pin').notNull(),
    deviceId: varchar('device_id').notNull().unique(),
    apiKey: varchar('api_key').notNull().unique(),
    expires: timestamp('expires').default(sql`now() + interval '1 hour'`),
  },
  (device) => ({
    composePk: primaryKey({ columns: [device.childId, device.deviceId] }),
  })
);
//#endregion device
