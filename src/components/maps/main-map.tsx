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
import type ChildModel from "@/lib/models/child";
import MapMarker from "@/components/maps/map-marker";
import { getLatestPing } from "@/lib/helpers/location/ping";

type MainMapProps = {
  kids: ChildModel[];
};
const MainMap: React.FC<MainMapProps> = ({ kids }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    console.log("MainMap", "kids", kids);
  }, [kids]);
  // Draw lines between each ping showing the direction of travel
  const renderLines = (kids: ChildModel[]) => {
    return kids?.map((kid) =>
      kid.devices?.map((device) =>
        device.pings?.map((ping, index) => {
          const nextPing = device.pings[index + 1];
          if (nextPing) {
            return (
              <>
                <Polyline
                  key={`${ping.id}-${nextPing.id}`}
                  positions={[
                    [ping.latitude, ping.longitude],
                    [nextPing.latitude, nextPing.longitude],
                  ]}
                />
                <MapMarker
                  key={ping.id}
                  childName={kid.name}
                  avatar={kid.avatar}
                  deviceId={device.id}
                  deviceName={device.deviceName}
                  latitude={ping.latitude}
                  longitude={ping.longitude}
                  timestamp={ping.timestamp}
                />
              </>
            );
          }
          return null;
        }),
      ),
    );
  };
  return (
    isMounted && (
      <div>
        <MapContainer
          className="map"
          center={[51.903614, -8.468399]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <>
            {renderLines(kids)}
            {kids?.map((kid) =>
              kid.devices?.map((device) => {
                const latestPing = getLatestPing(device.pings);

                return (
                  latestPing && (
                    <MapMarker
                      key={latestPing.id}
                      childName={kid.name}
                      avatar={kid.avatar}
                      deviceId={device.id}
                      deviceName={device.deviceName}
                      latitude={latestPing.latitude}
                      longitude={latestPing.longitude}
                      timestamp={latestPing.timestamp}
                    />
                  )
                );

                // Draw coordinates of each ping on the map
                const renderPings = () => {
                  return kids?.map((kid) =>
                    kid.devices?.map((device) =>
                      device.pings?.map((ping) => (
                        <Circle
                          key={ping.id}
                          center={[ping.latitude, ping.longitude]}
                          radius={100} // Adjust the radius as needed
                        />
                      )),
                    ),
                  );
                };

                return (
                  latestPing && (
                    <MapMarker
                      key={latestPing.id}
                      childName={kid.name}
                      avatar={kid.avatar}
                      deviceId={device.id}
                      deviceName={device.deviceName}
                      latitude={latestPing.latitude}
                      longitude={latestPing.longitude}
                      timestamp={latestPing.timestamp}
                    />
                  )
                );
              }),
            )}
          </>
        </MapContainer>
      </div>
    )
  );
};
export default MainMap;
