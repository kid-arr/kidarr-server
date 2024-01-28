import dynamic from "next/dynamic";
import { api } from "@/trpc/server";
import ChildrenFilter from "../children/children-filter";
import { MapViewTypeSelector } from "../maps/map-viewtype-selector";

const DashboardPage = async () => {
  const { children } = await api.children.getChildren.query();
  const Map = dynamic(() => import("@/components/maps/main-map"), {
    ssr: false,
  });
  return (
    <div>
      <div className="flex flex-row justify-between">
        <ChildrenFilter kids={children} />
        <MapViewTypeSelector />
      </div>
      <div className="mt-4">
        <Map kids={children} />
      </div>
    </div>
  );
};
export default DashboardPage;
