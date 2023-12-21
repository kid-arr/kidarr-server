import db from '@/db';
import { child } from '@/db/schema';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/services/auth/config';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  if (!session || !session.user)
    return NextResponse.json(
      { error: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
      { status: StatusCodes.UNAUTHORIZED }
    );
  const activeChildren = await db.query.child.findMany({
    where: eq(child.parentId, session.user.id),
    with: {
      devices: {
        with: { pings: true },
      },
    },
  });

  return NextResponse.json(activeChildren);
}
