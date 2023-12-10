import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_RT_HOST: z.string().url(),
    NEXT_PUBLIC_ISPROD: z.boolean(),
  },
  // Only client vars need to be entered here
  // Server side vars are automatically grokked.
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_RT_HOST: process.env.NEXT_PUBLIC_RT_HOST,
    NEXT_PUBLIC_ISPROD: process.env.NODE_ENV !== 'development',
  },
})
