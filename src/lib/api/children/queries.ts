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

export const getChildById__Unsafe = async (id: ChildId) => {
  //this method should only be called from a /device/connect endpoint
  //it will find the child by id without having an authenticated request
  console.log("Queries", "getChildById__Unsafe", id);
  const [c] = await db
    .select()
    .from(children)
    .where(and(eq(children.id, id)));
  console.log("Queries", "getChildById__Unsafe", c);
  return { child: c };
};

export const getChildById = async (id: ChildId) => {
  console.log("Queries", "getChildById", id);

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
