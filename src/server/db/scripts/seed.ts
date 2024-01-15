/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { db } from "..";
import * as schema from "../schema";
import { faker } from "@faker-js/faker";

console.log("seed", "Seeding");
const seedUsers = [
  {
    id: "2250f34e-997a-44de-ab8d-beddeda13525",
    name: "Fergal Moran",
    email: "fergal.moran@gmail.com",
    emailVerified: new Date(),
  },
];
await db.insert(schema.users).values(seedUsers).execute();

const seedChildren = [
  {
    id: "2250f34e-997a-44de-ab8d-beddeda13525",
    name: "Lil Debuggles",
    phone: "123 456 789",
    email: "lildebuggles@kidarr.com",
    avatar: faker.image.avatar(),
    parentId: seedUsers[0]?.id!,
  },
];
await db.insert(schema.child).values(seedChildren).execute();

const seedDevices = [
  {
    id: "5af79a30-df27-4646-9d9f-77e19b4191c1",
    deviceId: "373791e3-afe3-49de-b0a2-842a44071585",
    childId: seedChildren[0]?.id!,
    deviceName: "Not an iPhone",
    apiKey: "nQhXtqemsWjzBpbDxlIV2qtDx9xxO4oZVBJADdhJLfA=",
    pin: 1234,
    expires: new Date(2065),
  },
];
await db.insert(schema.device).values(seedDevices).execute();

const seedPings = [
  {
    deviceId: seedDevices[0]?.id!,
    latitude: 51.903614,
    longitude: -8.468399,
    timestamp: new Date(),
  },
  {
    deviceId: seedDevices[0]?.id!,
    latitude: 51.8985,
    longitude: -8.4756,
    timestamp: new Date(),
  },
  {
    deviceId: seedDevices[0]?.id!,
    latitude: 51.93588161110811,
    longitude: -8.495129534566756,
    timestamp: new Date(),
  },
];
await db.insert(schema.ping).values(seedPings).execute();
console.log("seed", "Seeded");
