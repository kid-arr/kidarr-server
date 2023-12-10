import { StatusCodes } from 'http-status-codes';
import { notAuthorised, badRequest } from '../../responses';
import db from '@/db';
import { ping } from '@/db/schema';

const POST = async (req: Request, res: Response) => {
  const apiKey = req.headers.get('x-api-key');
  const deviceId = req.headers.get('x-device-id');
  if (!apiKey || !deviceId) {
    return notAuthorised();
  }

  const device = await db.query.device.findFirst({
    where: (device, {
      and,
      eq,
    }) => and(eq(device.deviceId, deviceId), eq(device.apiKey, apiKey)),
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

  const { coordinates } = await req.json();

  // Check if coordinates exist in the headers
  if (!coordinates) {
    return badRequest('Invalid coordinates');
  }

  // Process the coordinates
  // ...
  await db.insert(ping).values({
    deviceId: device.deviceId,
    locationX: coordinates.latitude,
    locationY: coordinates.longitude,
    timestamp: new Date(),
  });
  // Send a response
  return Response.json({}, { status: StatusCodes.CREATED });
};

export { POST };
