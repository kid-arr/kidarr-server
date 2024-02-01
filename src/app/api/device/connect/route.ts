import { getChildById } from "@/lib/api/children/queries";
import { badRequest } from "@/lib/api/responses";
import { createApiKey } from "@/lib/services/auth/api-key";
import { createDevice } from "@/lib/api/devices/mutations";

type DeviceConnectRequest = {
  deviceId: string;
  childId: string;
  deviceName: string;
};
const POST = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return badRequest("Invalid method");
  }

  const { deviceId, childId, deviceName } =
    (await req.json()) as DeviceConnectRequest;

  if (!deviceId || !childId || !deviceName) {
    return badRequest("Invalid request");
  }

  const child = (await getChildById(childId)).child;

  if (!child) {
    return badRequest("Invalid child");
  }

  const apiKey = createApiKey();

  await createDevice({
    childId: child.id,
    deviceId: deviceId,
    name: deviceName,
    apiKey: apiKey,
  });
};
