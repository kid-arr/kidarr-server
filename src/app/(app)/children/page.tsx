import ChildList from "@/components/children/child-list";
import NewChildModal from "@/components/children/child-modal";
import { api } from "@/trpc/server";
import { checkAuth } from "@/lib/auth/utils";

export default async function Children() {
  await checkAuth();
  const { children } = await api.children.getChildren.query();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="my-2 text-2xl font-semibold">Here are your children.</h1>
        <NewChildModal />
      </div>
      <ChildList children={children} />
    </main>
  );
}
