'use client';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { usePingSocket } from '@/lib/hooks/use-ping-socket';
import ChildModel from '@/lib/models/child';
import MapMarker from '@/components/maps/map-marker';

type MainMapProps = {
  kids: ChildModel[];
}
const MainMap: React.FC<MainMapProps> = ({ kids }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    console.log('MainMap', 'kids', kids);
  }, [kids]);
  //TODO: Replace with actual childId
  usePingSocket({
    childId: 'adeedf73-8068-442e-a9ed-144e18af34a4',
    locationUpdate: (location) => {
      console.log('MainMap', 'locationUpdate', location);
    },
  });

  return isMounted && <div>
    <MapContainer
      className="map"
      center={[51.903614, -8.468399]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <>
          {kids?.map((kid) =>
            kid.devices?.map((device) =>
              device.pings.map((ping) => (
                  <MapMarker
                    key={ping.id}
                    childName={kid.name}
                    avatar={kid.avatar}
                    deviceName={device.deviceName}
                    latitude={ping.latitude}
                    longitude={ping.longitude}
                    timestamp={ping.timestamp} />
                ),
              ),
            ))}
        </>
    </MapContainer>
  </div>;
};
export default MainMap;
