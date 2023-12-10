import db from '@/db';
import { eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { child, device } from '@/db/schema';
import { createApiKey } from '@/lib/services/auth/api';
import { badRequest } from '@/app/api/responses';

const POST = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const url = new URL(req.url);
    const { deviceId, childId } = await req.json();
    console.log('route', 'childId', childId);
    console.log('route', 'deviceId', deviceId);

    if (!childId || !deviceId) {
      return badRequest('Invalid registration request');
    }

    const childToRegister = (
      await db.selectDistinct().from(child).where(eq(child.id, childId))
    )[0];

    if (!childToRegister) {
      return badRequest('Invalid registration request');
    }

    let done = false;
    let pin = 2021;
    while (!done) {
      pin = Math.floor(1000 + Math.random() * 9000);
      console.log('route', 'device/connect', 'checking for PIN', pin);
      const exists = await db
        .selectDistinct()
        .from(device)
        .where(eq(device.pin, pin));
      console.log('route', 'exists', exists);
      done = exists.length === 0;
    }

    const apiKey = createApiKey();
    await db
      .insert(device)
      .values({
        childId: childToRegister.id,
        deviceId: deviceId,
        pin,
        apiKey: apiKey,
      })
      .execute();
    return Response.json(
      { childId, deviceId, pin, apiKey },
      { status: StatusCodes.CREATED },
    );
  }
  return badRequest('Invalid registration request');
};

export { POST };
