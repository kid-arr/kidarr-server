import { newChildSchema } from '@/lib/validations/child';
import { getServerAuthSession } from '@/lib/services/auth/config';
import { NextResponse } from 'next/server';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import db from '@/db/schema';
import { children } from '@/db/schema/children';

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session)
    return NextResponse.json(
      { error: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
      { status: StatusCodes.UNAUTHORIZED }
    );
  const body = await req.json();

  const { name } = newChildSchema.parse(body);

  const child = await db.insert(children).values({
    name,
  });

  return NextResponse.json({ status: 'success', pin: 'fartle' });
}
