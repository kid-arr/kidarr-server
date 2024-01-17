import React from "react";
import PrintEnv from "@/components/widgets/print-env";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

export const SecureDebugDetails = async () => {
  const session = await getServerSession(authOptions);
  const request = headers();
  return <PrintEnv session={session} request={request} />;
};
