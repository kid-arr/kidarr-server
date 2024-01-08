import type PingModel from './ping';

export default interface DeviceModel {
  id: string;
  deviceName: string;
  pings: PingModel[];
}
