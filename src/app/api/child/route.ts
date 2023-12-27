import { db } from "@/server/db";
import { child } from "@/server/db/schema";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth";

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  if (!session || !session.user)
    return NextResponse.json(
      { error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      { status: StatusCodes.UNAUTHORIZED },
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
