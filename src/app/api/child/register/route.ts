import { getServerAuthSession } from '@/lib/services/auth/config';
import { NextResponse } from 'next/server';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
export async function POST(req: Request) {
  const body = await req.json();
}
