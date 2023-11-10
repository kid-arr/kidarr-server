import { newChildSchema } from '@/lib/validations/child';
import { getServerAuthSession } from '@/lib/services/auth/config';
import { createApiKey } from '@/lib/services/auth/api';

import { NextResponse } from 'next/server';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import db from '@/db/schema';

import { child, childDevices } from '@/db/schema/child';
import { users } from '@/db/schema/auth';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session || !session.user?.email)
    return NextResponse.json(
      { error: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
      { status: StatusCodes.UNAUTHORIZED }
    );

  const body = await req.json();
  const user = await db
    .selectDistinct({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email));

  if (!user) {
    return NextResponse.json(
      { error: `Unable to find user id for ${session.user.email}` },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
  const { name } = newChildSchema.parse(body);

  const newChild = await db
    .insert(child)
    .values({
      parentId: user[0].id.toString(),
      name,
    })
    .returning();
  if (!newChild) {
    return NextResponse.json(
      { error: `Error inserting child` },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
  let done = false;
  let pin = 0;
  while (!done) {
    pin = Math.floor(1000 + Math.random() * 9000);
    const exists = await db
      .selectDistinct()
      .from(childDevices)
      .where(eq(childDevices.childId, newChild[0].id));
    done = exists.length === 0;
  }
  const apiKey = createApiKey();
  await db
    .insert(childDevices)
    .values({ childId: newChild[0].id, pin, apiKey: apiKey })
    .execute();

  return NextResponse.json({ status: 'success', pin: pin });
}
