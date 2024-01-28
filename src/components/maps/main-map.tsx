/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
  Polyline,
} from "react-leaflet";
import { usePingSocket } from "@/lib/hooks/use-ping-socket";
import MapMarker from "@/components/maps/map-marker";
import { getLatestPing } from "@/lib/helpers/location/ping";
import { type CompleteChild } from "@/server/db/schema/children";

type MainMapProps = {
  kids: CompleteChild[];
};
const MainMap: React.FC<MainMapProps> = ({ kids }) => {
  return (
    <div>
      <MapContainer
        className="map"
        center={[51.903614, -8.468399]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};
export default MainMap;
