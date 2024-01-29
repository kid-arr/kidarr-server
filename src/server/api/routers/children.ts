import { getChildById, getChildren } from "@/lib/api/children/queries";
import {
  publicProcedure,
  createTRPCRouter,
} from "@/server/api/trpc";
import {
  childIdSchema,
  insertChildParams,
  updateChildParams,
} from "@/server/db/schema/children";
import {
  createChild,
  deleteChild,
  updateChild,
} from "@/lib/api/children/mutations";

export const childrenRouter = createTRPCRouter({
  getChildren: publicProcedure.query(async () => {
    return getChildren();
  }),
  getChildById: publicProcedure
    .input(childIdSchema)
    .query(async ({ input }) => {
      return getChildById(input.id);
    }),
  createChild: publicProcedure
    .input(insertChildParams)
    .mutation(async ({ input }) => {
      return createChild(input);
    }),
  updateChild: publicProcedure
    .input(updateChildParams)
    .mutation(async ({ input }) => {
      return updateChild(input.id, input);
    }),
  deleteChild: publicProcedure
    .input(childIdSchema)
    .mutation(async ({ input }) => {
      return deleteChild(input.id);
    }),
});
