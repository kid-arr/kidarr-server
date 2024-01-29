/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { db } from "..";
import { faker } from "@faker-js/faker";
import { users } from "../schema/auth";
import { children } from "../schema/children";
import { devices } from "../schema/devices";
import { pings } from "../schema/pings";

console.log("seed", "Seeding");
const runSeed = async () => {
  console.log("👯", "Seeding users");
  const seedUsers = [
    {
      id: "2250f34e-997a-44de-ab8d-beddeda13525",
      name: "Fergal Moran",
      email: "fergal.moran@gmail.com",
      emailVerified: new Date(),
    },
  ];
  await db.insert(users).values(seedUsers).execute();

  const seedChildren = [
    {
      id: "2250f34e-997a-44de-ab8d-beddeda13525",
      name: "Lil Debuggles",
      phone: "123 456 789",
      email: "lildebuggles@kidarr.com",
      avatar: faker.image.avatar(),
      userId: seedUsers[0]?.id!,
    },
  ];
  await db.insert(children).values(seedChildren).execute();

  const seedDevices = [
    {
      id: "5af79a30-df27-4646-9d9f-77e19b4191c1",
      name: "Not an iPhone",
      deviceId: "373791e3-afe3-49de-b0a2-842a44071585",
      childId: seedChildren[0]?.id!,
      userId: seedUsers[0]?.id!,
      deviceName: "Not an iPhone",
      apiKey: "nQhXtqemsWjzBpbDxlIV2qtDx9xxO4oZVBJADdhJLfA=",
      pin: 1234,
      expires: new Date(2065),
    },
  ];
  await db.insert(devices).values(seedDevices).execute();

  const seedPings = [
    {
      deviceId: seedDevices[0]?.id!,
      userId: seedUsers[0]?.id!,
      latitude: 51.903614,
      longitude: -8.468399,
      timestamp: new Date(),
    },
    {
      deviceId: seedDevices[0]?.id!,
      userId: seedUsers[0]?.id!,
      latitude: 51.8985,
      longitude: -8.4756,
      timestamp: new Date(),
    },
    {
      deviceId: seedDevices[0]?.id!,
      userId: seedUsers[0]?.id!,
      latitude: 51.93588161110811,
      longitude: -8.495129534566756,
      timestamp: new Date(),
    },
  ];
  await db.insert(pings).values(seedPings).execute();
  console.log("🌱", "Seeded users");
  process.exit(0);
};
runSeed().catch((err) => {
  console.error("❌ Seeding failed");
  console.error(err);
  process.exit(1);
});
