import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '@/env.mjs';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const client = postgres(env.DATABASE_URL as string);
const db = drizzle(client, { schema });

// console.log('DRIZZLE', 'migrating');
// migrate(db, { migrationsFolder: 'drizzle' })
//   .then(() => console.log('DRIZZLE', 'migrated'));
export default db;
