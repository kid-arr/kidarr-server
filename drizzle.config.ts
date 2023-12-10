import type { Config } from 'drizzle-kit'
import { env } from '@/env.mjs'

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}
export default {
  schema: './src/db',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL as string,
  },
} satisfies Config
