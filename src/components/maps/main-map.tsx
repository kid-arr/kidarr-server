"use client";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "@/components/maps/map-marker";
import { type Child, type CompleteChild } from "@/server/db/schema/children";
import { type Ping } from "@/server/db/schema/pings";
import { type Device } from "@/server/db/schema/devices";
import { getLatestPing } from "@/lib/helpers/location/ping";

type MainMapProps = {
  kids: CompleteChild[];
  mode: "latest" | "route";
};

const _renderMarker = (ping: Ping, device: Device, child: Child) => {
  return (
    <MapMarker
      key={ping.id}
      deviceId={device.id}
      childName={child.name}
      avatar={child.avatar}
      deviceName={device.name}
      latitude={ping.latitude}
      longitude={ping.longitude}
      timestamp={ping.timestamp}
    />
  );
};
const MainMap: React.FC<MainMapProps> = ({ kids, mode }) => {
  return (
    <div>
      <MapContainer
        className="map"
        center={[51.903614, -8.468399]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {kids?.map((kid) =>
          kid.devices?.map((device) =>
            mode === "route"
              ? device.pings.map(
                  (ping) =>
                    device.pings.length > 0 && _renderMarker(ping, device, kid),
                )
              : _renderMarker(getLatestPing(device.pings)!, device, kid),
          ),
        )}
      </MapContainer>
    </div>
  );
};
export default MainMap;
