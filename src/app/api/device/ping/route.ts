import { StatusCodes } from 'http-status-codes';
import { notAuthorised, badRequest } from '../../responses';
import db from '@/db';
import { device } from '@/db/schema';
import { eq } from 'drizzle-orm';

const POST = async (req: Request, res: Response) => {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey) {
    return notAuthorised();
  }

  const user = await db.query.device.findFirst({
    where: (device, { eq }) => eq(device.apiKey, apiKey),
    with: {
      child: true,
    },
  });

  const { coordinates } = await req.json();

  // Check if coordinates exist in the headers
  if (!coordinates) {
    return badRequest('Invalid coordinates');
  }

  // Process the coordinates
  // ...

  // Send a response
  return Response.json({}, { status: StatusCodes.CREATED });
};

export { POST };
