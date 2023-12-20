import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development');
