import { db } from "@/server/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ChildId, 
  NewChildParams,
  UpdateChildParams, 
  updateChildSchema,
  insertChildSchema, 
  children,
  childIdSchema 
} from "@/server/db/schema/children";
import { getUserAuth } from "@/lib/auth/utils";

export const createChild = async (child: NewChildParams) => {
  const { session } = await getUserAuth();
  const newChild = insertChildSchema.parse({ ...child, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(children).values(newChild).returning();
    return { child: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChild = async (id: ChildId, child: UpdateChildParams) => {
  const { session } = await getUserAuth();
  const { id: childId } = childIdSchema.parse({ id });
  const newChild = updateChildSchema.parse({ ...child, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(children)
     .set(newChild)
     .where(and(eq(children.id, childId!), eq(children.userId, session?.user.id!)))
     .returning();
    return { child: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChild = async (id: ChildId) => {
  const { session } = await getUserAuth();
  const { id: childId } = childIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(children).where(and(eq(children.id, childId!), eq(children.userId, session?.user.id!)))
    .returning();
    return { child: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

