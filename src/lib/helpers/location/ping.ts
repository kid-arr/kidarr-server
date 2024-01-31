import { type CompletePing } from "@/server/db/schema/pings";

export const getLatestPing = (
  pings: CompletePing[],
): CompletePing | undefined => {
  if (pings && pings.length !== 0) {
    return pings.reduce((ping, current) =>
      ping.timestamp > current.timestamp ? ping : current,
    );
  }
  return undefined;
};
