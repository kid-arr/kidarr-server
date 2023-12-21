import * as dotenv from 'dotenv';
import * as schema from '@/db/schema';
import db from '..';
// dotenv.config({ path: './.env' });

// if (!('DATABASE_URL' in process.env))
//   throw new Error('DATABASE_URL not found on .env.development');
const main = async () => {
  const seedUsers = [
    {
      id: '2250f34e-997a-44de-ab8d-beddeda13525',
      name: 'Fergal Moran',
      email: 'fergal.moran@gmail.com',
      emailVerified: new Date(),
    },
  ];
  db.insert(schema.users).values(seedUsers).execute();

  const seedChildren = [
    {
      id: '2250f34e-997a-44de-ab8d-beddeda13525',
      name: 'Lil Debuggles',
      phone: '123 456 789',
      email: 'lildebuggles@parentgrine.com',
      parentId: seedUsers[0].id,
    },
  ];
  db.insert(schema.child).values(seedChildren).execute();

  const seedDevices = [
    {
      deviceId: '373791e3-afe3-49de-b0a2-842a44071585',
      childId: seedChildren[0].id,
      apiKey: 'nQhXtqemsWjzBpbDxlIV2qtDx9xxO4oZVBJADdhJLfA=',
      pin: 1234,
      expires: new Date(2065),
    },
  ];
  db.insert(schema.device).values(seedDevices).execute();
  return;
};

console.log('seed', 'Seeding');
main().then(
  () => {
    console.log('seed', 'Seeded');
  },
  (err) => {
    console.log('seed', 'Error', err);
  }
);
