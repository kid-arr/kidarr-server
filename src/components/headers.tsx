import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { type ReactElement } from "react";

export const getRequestHeaders = (headers: ReadonlyHeaders) => {
  const result: ReactElement[] = [];

  for (const pair of headers.entries()) {
    result.push(
      <div>
        {pair[0]}: {pair[1]}
      </div>,
    );
  }

  return result;
};
