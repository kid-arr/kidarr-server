'use client';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { usePingSocket } from '@/lib/hooks/use-ping-socket';
import ChildModel from '@/lib/models/child';
import MapMarker from '@/components/maps/map-marker';
import { getLatestPing } from '@/lib/utils';

type MainMapProps = {
  kids: ChildModel[];
}
const MainMap: React.FC<MainMapProps> = ({ kids }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    console.log('MainMap', 'kids', kids);
  }, [kids]);


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
            kid.devices?.map((device) => {
                const latestPing = getLatestPing(device.pings);
                return (
                  latestPing && <MapMarker
                    key={latestPing.id}
                    childName={kid.name}
                    avatar={kid.avatar}
                    deviceId={device.id}
                    deviceName={device.deviceName}
                    latitude={latestPing.latitude}
                    longitude={latestPing.longitude}
                    timestamp={latestPing.timestamp} />
                );
              },
            ),
          )}
        </>
    </MapContainer>
  </div>;
};
export default MainMap;
