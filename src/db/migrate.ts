import 'dotenv/config';
import db from '.';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// This will run migrations on the database, skipping the ones already applied
// migrate(db, { migrationsFolder: './drizzle' }).then(() =>
//   console.log('DRIZZLE', 'migrated')
// );
