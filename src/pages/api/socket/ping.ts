import { db } from "@/server/db";
import { StatusCodes } from "http-status-codes";
import { type NextApiResponseServerIo } from "@/lib/models/types/next-api-response-socket";
import { type NextApiRequest } from "next";
import type LocationUpdate from "@/lib/models/location-update";
import { badRequest, notAuthorised } from "@/lib/api/responses";
import { getDeviceById } from "@/lib/api/devices/queries";
import { getChildById } from "@/lib/api/children/queries";
import { createPing } from "@/lib/api/pings/mutations";

type PingRequest = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
};
export default async function POST(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ message: "Method not allowed" });
  }
  const apiKey = req?.headers["x-api-key"] as string;
  const deviceId = req?.headers["x-device-id"] as string;
  if (!apiKey || !deviceId) {
    return notAuthorised();
  }

  const device = (await getDeviceById(deviceId)).device;

  if (!device) {
    return notAuthorised();
  }

  const { coordinates } = req.body as PingRequest;

  // Check if coordinates exist in the headers
  if (!coordinates) {
    return badRequest("Invalid coordinates");
  }

  const location = await createPing({
    deviceId: device.id,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  });

  console.log("ping-route", `ping:${device.id}`, location);
  res?.socket?.server?.io?.emit(`ping:${device.id}`, location);
  // Send a response
  return res.json(location);
}
