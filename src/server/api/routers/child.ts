import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { child } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const childRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log('Child', 'Create', ctx.session);
      const c = {
        parentId: ctx.session.user.id,
        name: input.name,
      };
      const result = await ctx.db.insert(child).values(c).returning();
      return result[0];
    }),

  mine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.child.findMany({
      orderBy: (child, { asc }) => [asc(child.name)],
      where: eq(child.parentId, ctx.session.user.id),
      with: {
        devices: {
          with: { pings: true },
        },
      },
    });
  }),
});
