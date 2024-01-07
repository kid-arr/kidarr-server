import { db } from '@/server/db';
import { StatusCodes } from 'http-status-codes';
import { ping } from '@/server/db/schema';
import { NextApiResponseServerIo } from '@/lib/models/types/next-api-response-socket';
import { badRequest, notAuthorised } from '@/app/api/responses';
import { NextApiRequest, NextApiResponse } from 'next';
import LocationUpdate from '@/lib/models/location-update';

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== 'POST') {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ message: 'Method not allowed' });
  }
  const apiKey = req?.headers['x-api-key'] as string;
  const deviceId = req?.headers['x-device-id'] as string;
  if (!apiKey || !deviceId) {
    return notAuthorised();
  }

  const device = await db.query.device.findFirst({
    where: (device, { and, eq }) =>
      and(eq(device.deviceId, deviceId), eq(device.apiKey, apiKey)),
  });

  if (!device) {
    return notAuthorised();
  }

  const child = await db.query.child.findFirst({
    where: (child, { eq }) => eq(child.id, device.childId),
  });

  if (!child) {
    return notAuthorised();
  }
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, child.parentId),
  });

  const { coordinates } = req.body;

  // Check if coordinates exist in the headers
  if (!coordinates) {
    return badRequest('Invalid coordinates');
  }

  const location = await db.insert(ping).values({
    deviceId: device.id,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    timestamp: new Date(),
  });

  const update: LocationUpdate = {
    childId: child.id,
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    date: new Date(),
  };
  console.log('ping-route', `ping:${device.id}`, update);
  res?.socket?.server?.io?.emit(`ping:${device.id}`, update);
  // Send a response
  return res.json({});
}
