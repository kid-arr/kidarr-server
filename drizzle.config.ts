import type { Config } from 'drizzle-kit';
import { env } from '@/env';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}
export default {
  // schema: './src/db',
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
