import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import PingModel from '@/lib/models/ping';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => name?.match(/(\b\S)?/g)?.join('') ?? '';

export const getLatestPing = (pings: PingModel[]): PingModel =>
  pings.reduce((ping, current) => (ping.timestamp > current.timestamp ? ping : current));
