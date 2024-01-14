import type PingModel from "@/lib/models/ping";

export const getLatestPing = (pings: PingModel[]): PingModel | undefined => {
  if (pings && pings.length !== 0) {
    return pings.reduce((ping, current) =>
      ping.timestamp > current.timestamp ? ping : current,
    );
  }
  return undefined;
};
