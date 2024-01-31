"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icons } from "@/components/icons";
import React from "react";

type MapViewTypeSelectorProps = {
  currentView: "latest" | "route";
  onChange: (mode: "latest" | "route") => void;
};
export const MapViewTypeSelector: React.FC<MapViewTypeSelectorProps> = ({
  currentView,
  onChange,
}) => {
  return (
    <ToggleGroup
      type="single"
      value={currentView}
      onValueChange={(value) =>
        onChange(value === "latest" ? "latest" : "route")
      }
    >
      <ToggleGroupItem value="latest">
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
