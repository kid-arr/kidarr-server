import React from "react";
import DashboardPage from "@/components/pages/dashboard-page";
import { api } from "@/trpc/server";

const Dashboard = async () => {
  const kids = await api.child.mine.query();
  return <DashboardPage kids={kids} />;
};

export default Dashboard;
