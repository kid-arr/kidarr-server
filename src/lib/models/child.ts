import DeviceModel from './device';

export default interface ChildModel {
  id: string;
  name: string;
  avatar: string;
  devices: DeviceModel[];
  // recentLocations: Location[];
}
