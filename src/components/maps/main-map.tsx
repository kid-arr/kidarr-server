'use client';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { usePingSocket } from '@/lib/hooks/use-ping-socket';

const MainMap = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  //TODO: Replace with actual childId
  usePingSocket({
    childId: 'adeedf73-8068-442e-a9ed-144e18af34a4',
    locationUpdate: (location) => {
      console.log('MainMap', 'locationUpdate', location);
    },
  });
  return (
    isMounted && (
      <div>
        <MapContainer
          className='map'
          center={[51.903614, -8.468399]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[51.903614, -8.468399]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  );
};

export default MainMap;
