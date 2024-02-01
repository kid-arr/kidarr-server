import { formatDistance } from "date-fns";

export const humanizeDate = (date: Date) =>
  formatDistance(date, new Date(), { addSuffix: true });
