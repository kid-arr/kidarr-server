import db from '@/db';
import { StatusCodes } from 'http-status-codes';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { device, child } from '@/db/schema';
export async function POST(req: Request) {
  const headersList = headers();
  const apiKey = headersList.get('X-Auth-ApiKey');

  if (!apiKey) {
    return new Response('Unauthorized', {
      status: StatusCodes.UNAUTHORIZED,
      statusText: 'Unauthorized',
    });
  }

  const childId = await db
    .selectDistinct()
    .from(device)
    .where(eq(device.apiKey, apiKey));
  if (!childId) {
    return new Response('Unauthorized', {
      status: StatusCodes.UNAUTHORIZED,
      statusText: 'Unauthorized',
    });
  }
  const pinger = await db
    .selectDistinct()
    .from(child)
    .where(eq(child.id, childId[0].childId));
  if (!pinger) {
    return new Response('Unauthorized', {
      status: StatusCodes.UNAUTHORIZED,
      statusText: 'Unauthorized',
    });
  }
  return new Response('pong', {
    status: StatusCodes.OK,
    statusText: 'OK',
  });
}
