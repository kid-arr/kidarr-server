import type DeviceModel from './device';

export default interface ChildModel {
  id: string;
  name: string;
  avatar: string | null;
  devices: DeviceModel[];
  // recentLocations: Location[];
}
