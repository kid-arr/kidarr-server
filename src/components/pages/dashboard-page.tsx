"use client";
import React from "react";
import dynamic from "next/dynamic";
import ChildrenFilter from "../children/children-filter";
import { MapViewTypeSelector } from "../maps/map-viewtype-selector";
import { type CompleteChild } from "@/server/db/schema/children";

type DashboardPageProps = {
  children: CompleteChild[];
};
const DashboardPage: React.FC<DashboardPageProps> = ({ children }) => {
  const [mode, setMode] = React.useState<"latest" | "route">("latest");
  const Map = dynamic(() => import("@/components/maps/main-map"), {
    ssr: false,
  });
  return (
    <div>
      <div className="flex flex-row justify-between">
        <ChildrenFilter children={children} />
        <MapViewTypeSelector
          currentView={mode}
          onChange={(mode) => setMode(mode)}
        />
      </div>
      <div className="mt-4">
        <Map kids={children} mode={mode} />
      </div>
    </div>
  );
};
export default DashboardPage;
