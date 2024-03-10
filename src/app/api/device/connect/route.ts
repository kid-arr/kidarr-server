import { getChildById, getChildById__Unsafe } from "@/lib/api/children/queries";
import { badRequest, created } from "@/lib/api/responses";
import { createApiKey } from "@/lib/services/auth/api-key";
import { createDevice } from "@/lib/api/devices/mutations";
import { NewDevice } from "@/server/db/schema/devices";

type DeviceConnectRequest = {
  deviceId: string;
  childId: string;
  deviceName: string;
};
export const POST = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return badRequest("Invalid method");
  }

  const { deviceId, childId, deviceName } =
    (await req.json()) as DeviceConnectRequest;

  if (!deviceId || !childId || !deviceName) {
    return badRequest("Invalid request");
  }
  const { child } = await getChildById__Unsafe(childId);

  if (!child) {
    return badRequest("Invalid child");
  }

  const apiKey = createApiKey();

  const newDevice = await createDevice(
    {
      childId: child.id,
      deviceId: deviceId,
      name: deviceName,
      apiKey: apiKey,
    } as NewDevice,
    child.userId,
  );

  return created(JSON.stringify(newDevice));
};
