
import HomePage from "@/components/pages/home-page";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await getUserAuth();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="space-y-4">
      <HomePage />
    </main>
  );
}
