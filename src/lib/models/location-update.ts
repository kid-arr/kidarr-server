import type Location from './location';

export default interface LocationUpdate {
  childId: string;
  location: Location;
  date: Date;
}
