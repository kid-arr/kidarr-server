import { db } from "@/server/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import {
  type ChildId,
  childIdSchema,
  children,
} from "@/server/db/schema/children";
import { devices } from "@/server/db/schema/devices";

export const getChildren = async () => {
  const { session } = await getUserAuth();
  const c = await db
    .select()
    .from(children)
    .where(eq(children.userId, session?.user.id!))
    .orderBy(children.name);
  return { children: c.map((c) => ({ ...c, devices: [] })) };
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
