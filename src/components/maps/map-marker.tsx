import React from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { usePingSocket } from "@/lib/hooks/use-ping-socket";
import { getInitials } from "@/lib/helpers/name";

type MapMarkerProps = {
  childName: string;
  avatar: string | null;
  deviceId: string;
  deviceName: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
};

const _getAvatarImage = (avatar: string | null) =>
  avatar ?? "/img/default-avatar.png";
const _getIcon = (icon: string | null) => {
  return L.icon({
    iconUrl: _getAvatarImage(icon),
    iconSize: [24, 24],
  });
};
const MapMarker: React.FC<MapMarkerProps> = ({
  childName,
  avatar,
  deviceId,
  deviceName,
  latitude,
  longitude,
  timestamp,
}) => {
  const [position, setPosition] = React.useState<[number, number]>([
    latitude,
    longitude,
  ]);
  usePingSocket({
    deviceId: deviceId,
    locationUpdate: (ping) => {
      setPosition([ping.location.latitude, ping.location.longitude]);
    },
  });
  return (
    <div className="animate-spin">
      <Marker position={position} icon={_getIcon(avatar)}>
        <Popup>
          <Card className="grid w-full max-w-md gap-4">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={_getAvatarImage(avatar)} alt={childName} />
                  <AvatarFallback>{getInitials(childName)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="text-lg font-bold">{childName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-row items-center space-x-3 px-2">
                      <Icons.device /> {deviceName}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last seen -{" "}
                {timestamp.toLocaleDateString() +
                  " " +
                  timestamp.toLocaleTimeString()}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Link className="text-primary" href="#">
                <Icons.message className="h-6 w-6" />
              </Link>
              <Link className="text-primary" href="#">
                <Icons.call className="h-6 w-6" />
              </Link>
            </CardFooter>
          </Card>
        </Popup>
      </Marker>
    </div>
  );
};

export default MapMarker;
