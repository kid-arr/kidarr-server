import { badRequest, notAuthorised } from "@/lib/api/responses";
import { getDeviceByApiKey } from "@/lib/api/devices/queries";
import { createPing } from "@/lib/api/pings/mutations";

type PingRequest = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export const POST = async (req: Request, res: Response) => {
  if (!req.headers.get("x-api-key") || !req.headers.get("x-device-id")) {
    return badRequest("Invalid request");
  }

  const apiKey = req.headers.get("x-api-key")!;
  const deviceId = req.headers.get("x-device-id")!;
  console.log("Route", "ping", apiKey, deviceId);

  const device = await getDeviceByApiKey(apiKey, deviceId);

  if (!device) {
    return notAuthorised();
  }
  const { coordinates } = (await req.json()) as PingRequest;
  if (!coordinates) {
    return badRequest("Invalid coordinates");
  }

  const location = await createPing(
    {
      deviceId: device.id,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    device.userId,
  );

  return new Response(JSON.stringify({ message: device.name, location }), {
    status: 200,
  });
};
