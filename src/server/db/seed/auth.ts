import { db } from "..";
import { accounts } from "../schema/auth";

const runAuthSeed = async () => {
  console.log("🔐", "Seeding auth");
  await db
    .insert(accounts)
    .values([
      {
        userId: "2250f34e-997a-44de-ab8d-beddeda13525",
        provider: "google",
        type: "oauth",
        providerAccountId: "112561477626832751929",
        access_token: "FARTS",
        expires_at: 9,
        token_type: "Bearer",
        scope:
          "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        id_token: "FARTS",
      },
    ])
    .execute();

  console.log("🌱", "Seeded auth");
  process.exit(0);
};
runAuthSeed().catch((err) => {
  console.error("❌ Auth seeding failed");
  console.error(err);
  process.exit(1);
});
