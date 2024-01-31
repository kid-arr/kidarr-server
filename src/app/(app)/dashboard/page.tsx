import DashboardPage from "@/components/pages/dashboard-page";
import { checkAuth } from "@/lib/auth/utils";
import React from "react";
import { api } from "@/trpc/server";

const Dashboard = async () => {
  await checkAuth();
  const { children } = await api.children.getChildren.query();
  return <DashboardPage children={children} />;
};

export default Dashboard;
