import * as z from 'zod';

export const newChildSchema = z.object({
  name: z.string().max(50),
});
