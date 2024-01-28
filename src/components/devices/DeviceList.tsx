"use client";
import { CompleteDevice } from "@/server/db/schema/devices";
import { api as trpc } from "@/trpc/react";
import DeviceModal from "./DeviceModal";


export default function DeviceList({ devices }: { devices: CompleteDevice[] }) {
  const { data: d } = trpc.devices.getDevices.useQuery(undefined, {
    initialData: { devices },
    refetchOnMount: false,
  });

  if (d.devices.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {d.devices.map((device) => (
        <Device device={device} key={device.device.id} />
      ))}
    </ul>
  );
}

const Device = ({ device }: { device: CompleteDevice }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{device.device.name}</div>
      </div>
      <DeviceModal device={device.device} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No devices
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new device.
      </p>
      <div className="mt-6">
        <DeviceModal emptyState={true} />
      </div>
    </div>
  );
};

