import * as z from 'zod';

export const connectDeviceSchema = z.object({
  childId: z.string().max(50),
});
