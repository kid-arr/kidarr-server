import { useSocket } from '@/lib/services/realtime/socket-provider';
import { useEffect } from 'react';
import type LocationUpdate from '@/lib/models/location-update';

type LocationSocketProps = {
  deviceId: string;
  locationUpdate: (location: LocationUpdate) => void;
}
export const usePingSocket = ({
  deviceId,
  locationUpdate,
}: LocationSocketProps) => {
  const { socket } = useSocket();
  const listenKey = `ping:${deviceId}`;
  useEffect(() => {
    console.log('UsePingSocket', 'Listening on key', listenKey);
    if (!socket) return;
    socket.on(listenKey, (data: LocationUpdate) => {
      console.log('UseLocationSocket', 'updateKey', data);
      locationUpdate(data);
    });

    return () => {
      socket.off(listenKey);
    };
  }, [socket, listenKey]);
};
