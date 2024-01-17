import { type Session } from "next-auth";
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { env } from "@/env";

type PrintEnvProps = {
  session: Session | null;
  request: ReadonlyHeaders;
};

const PrintEnv: React.FC<PrintEnvProps> = ({ session, request }) => {
  return (
    <div className="flex flex-col space-y-4">
      {session && (
        <Card>
          <CardHeader>Session</CardHeader>
          <CardContent>{JSON.stringify(session, null, 2)}</CardContent>
        </Card>
      )}
      {request && (
        <Card>
          <CardHeader>Request</CardHeader>
          <CardContent>{JSON.stringify(request, null, 2)}</CardContent>
        </Card>
      )}
      {env && (
        <Card>
          <CardHeader>Process</CardHeader>
          <CardContent>{JSON.stringify(env, null, 2)}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrintEnv;
