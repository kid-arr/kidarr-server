import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
} from "react";
import L from "leaflet";
import { Marker, Popup, PopupProps } from "react-leaflet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { usePingSocket } from "@/lib/hooks/use-ping-socket";
import { getInitials } from "@/lib/helpers/name";
import { Bold } from "lucide-react";
import { Button } from "@/components/ui/button";
import { humanizeDate } from "@/lib/helpers/date";

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

  const popup = React.createRef<any>();

  usePingSocket({
    deviceId: deviceId,
    locationUpdate: (ping) => {
      setPosition([ping.location.latitude, ping.location.longitude]);
    },
  });

  const _closePopup = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    popup?.current?._source.closePopup();
  };

  return (
    <div className="animate-spin">
      <Marker position={position} icon={_getIcon(avatar)}>
        <Popup closeButton={false} ref={popup}>
          <Card className="grid w-full max-w-md gap-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 pb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={_getAvatarImage(avatar)} alt={childName} />
                <AvatarFallback>{getInitials(childName)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-semibold leading-none tracking-tight">
                {childName}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={_closePopup}>
                <Icons.close />
              </Button>
            </CardHeader>
            <CardContent className="mx-6 p-2">
              <div className="flex flex-row items-center space-x-3 pb-2">
                <Icons.device /> {deviceName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last seen - {humanizeDate(timestamp)}
              </div>
            </CardContent>
            <CardFooter className="text- flex justify-end gap-4">
              <Link href="#">
                <Icons.message className="h-6 w-6 text-secondary-foreground" />
              </Link>
              <Link href="#">
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
