import db from '@/db/schema';
import { children } from '@/db/schema/children';
import { getServerSession } from 'next-auth';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextResponse } from 'next/server';
import authOptions from '@/lib/services/auth/config';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
      { status: StatusCodes.UNAUTHORIZED }
    );
  const activeChildren = await db.select().from(children);

  return NextResponse.json(activeChildren);
}
