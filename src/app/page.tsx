import { getServerAuthSession } from "@/server/auth";
import DashboardPage from "@/components/pages/dashboard-page";
import HomePage from "@/components/pages/home-page";

export default async function Home() {
  const session = await getServerAuthSession();

  return session?.user ? <DashboardPage /> : <HomePage />;
}
