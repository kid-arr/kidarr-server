import DashboardPage from "@/components/pages/dashboard-page";
import { checkAuth } from "@/lib/auth/utils";
import React from "react";

const Dashboard = async () => {
  await checkAuth();
  return <DashboardPage />;
};

export default Dashboard;
