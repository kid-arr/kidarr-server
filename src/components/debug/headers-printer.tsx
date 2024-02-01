/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { headers } from "next/headers";
import { getRequestHeaders } from "@/components/headers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const HeadersPrinter = () => {
  const header = headers();

  const request = getRequestHeaders(header);
  return (
    <Card>
      <CardHeader>Request Headers</CardHeader>
      <CardContent>{request}</CardContent>
    </Card>
  );
};
export default HeadersPrinter;
