import { type Session } from "next-auth";
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import React from "react";
import { env } from "@/env";
type PrintEnvProps = {
  session: Session | null;
  request: ReadonlyHeaders;
};

const PrintEnv: React.FC<PrintEnvProps> = ({ session, request }) => {
  return (
    <div className="flex flex-col space-x-4">
      <div>{JSON.stringify(session, null, 2)}</div>
      <div>{JSON.stringify(request, null, 2)}</div>
      <div>{JSON.stringify(env, null, 2)}</div>
    </div>
  );
};
export default PrintEnv;
