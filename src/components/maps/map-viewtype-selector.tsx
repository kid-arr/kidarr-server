"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icons } from "@/components/icons";
import React from "react";

export const MapViewTypeSelector = () => {
  const [currentView, setCurrentView] = React.useState("location");
  return (
    <ToggleGroup
      type="single"
      value={currentView}
      onValueChange={(value) => setCurrentView(value)}
    >
      <ToggleGroupItem value="location">
        <Icons.location className="mr-1 h-4 w-4" />
        Location
      </ToggleGroupItem>
      <ToggleGroupItem value="route">
        <Icons.route className="mr-1 h-4 w-4" />
        Route
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
