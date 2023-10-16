import db from '@/db/schema';
import { children } from '@/db/schema/children';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/services/auth/config';

//TODO: create-t3-app supports app router now
export async function GET(request: Request) {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json(
      { error: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
      { status: StatusCodes.UNAUTHORIZED }
    );
  const activeChildren = await db.select().from(children);

  return NextResponse.json(activeChildren);
}
