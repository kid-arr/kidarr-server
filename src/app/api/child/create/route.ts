import { newChildSchema } from '@/lib/validations/child';
import { getServerAuthSession } from '@/lib/services/auth/config';
import { createApiKey } from '@/lib/services/auth/api';

import { NextResponse } from 'next/server';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import {db} from '@/server/db';

import { child } from '@/server/db/schema';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { device } from '@/server/db/schema';

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session || !session.user?.email)
    return NextResponse.next({
      statusText: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      status: StatusCodes.UNAUTHORIZED,
    });

  const body = await req.json();
  const user = await db
    .selectDistinct({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email));

  if (!user) {
    return NextResponse.next({
      statusText: `Unable to find user id for ${session.user.email}`,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
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
    return NextResponse.next({
      statusText: 'Error inserting child',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  return NextResponse.json({ status: 'success' });
}
