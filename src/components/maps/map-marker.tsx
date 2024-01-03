import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


type MapMarkerProps = {
  childName: string;
  avatar: string;
  deviceName: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
};
const fillBlueOptions = { fillColor: 'blue' };
const fillRedOptions = { fillColor: 'red' };

const MapMarker: React.FC<MapMarkerProps> = (
  { childName, avatar, deviceName, latitude, longitude, timestamp }) => {
  return <Circle
    center={[latitude, longitude]}
    pathOptions={fillBlueOptions}
    radius={800}
  >
    <Popup>
      <Card>
        <CardHeader>
          <CardTitle>{childName}</CardTitle>
          <CardDescription>on {deviceName} </CardDescription>
        </CardHeader>
        <CardContent>
          <img src={avatar} alt={childName} className="w-12 h-12" />
        </CardContent>
        <CardFooter>
          <p> Was seen here @ {timestamp.toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    </Popup>
  </Circle>;
};

export default MapMarker;
