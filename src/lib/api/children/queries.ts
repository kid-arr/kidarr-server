import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/server/db";
import {
  type ChildId,
  childIdSchema,
  children,
} from "@/server/db/schema/children";

export const getChildren = async () => {
  const { session } = await getUserAuth();
  console.log("queries", "getChildren", session?.user.id!);

  //TODO: We can actually use innerJoin here 
  //and destructure the args...
  const c = await db.query.children.findMany({
    where: (children, { eq }) => eq(children.userId, session?.user.id!),
    orderBy: (children) => children.name,
    with: {
      devices: {
        with: {
          pings: true,
        },
      },
    },
  });
  console.log("queries", "gotChildren", c);
  return { children: c };
  // const c = await db
  //   .select()
  //   .from(children)
  //   .where(eq(children.userId, session?.user.id!))
  //   .innerJoin(devices, eq(devices.childId, children.id))
  //   .innerJoin(pings, eq(pings.deviceId, devices.id))
  //   .orderBy(children.name);
  // return c;
};

export const getChildById = async (id: ChildId) => {
  const { session } = await getUserAuth();
  const { id: childId } = childIdSchema.parse({ id });
  const [c] = await db
    .select()
    .from(children)
    .where(
      and(eq(children.id, childId), eq(children.userId, session?.user.id!)),
    );
  return { child: c };
};
