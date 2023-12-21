import * as dotenv from 'dotenv';
import * as schema from '@/db/schema';
import db from '..';

const main = async () => {
  db.insert(schema.accounts)
    .values([
      {
        userId: '2250f34e-997a-44de-ab8d-beddeda13525',
        provider: 'google',
        type: 'oauth',
        providerAccountId: '112561477626832751929',
        access_token: 'FARTS',
        expires_at: 9,
        token_type: 'Bearer',
        scope:
          'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        id_token: 'FARTS',
      },
    ])
    .execute();
  return;
};

console.log('auth', 'Seeding auth');
main().then(
  () => {
    console.log('auth', 'Seeded auth');
  },
  (err) => {
    console.error('auth', 'Error seeding auth', err);
  }
);
