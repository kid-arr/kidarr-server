import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { child } from "@/server/db/schema";

export const childRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(child).values({
        parentId: ctx.session.user.id,
        name,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.child.findFirst({
      orderBy: (posts, { asc }) => [asc(child.name)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
