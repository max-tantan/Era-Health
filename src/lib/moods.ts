import { Smile, Sunset, Meh, CloudRain, BatteryLow, AlertCircle, type LucideIcon } from 'lucide-react';

export type Mood = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

export const MOODS: Mood[] = [
  { id: 'senang', label: 'senang', icon: Smile, color: 'var(--color-sprout-sticker)' },
  { id: 'tenang', label: 'tenang', icon: Sunset, color: 'var(--color-sky-sticker)' },
  { id: 'biasa', label: 'biasa', icon: Meh, color: 'var(--color-shadow-mist)' },
  { id: 'sedih', label: 'sedih', icon: CloudRain, color: 'var(--color-bubblegum-sticker)' },
  { id: 'capek', label: 'capek', icon: BatteryLow, color: 'var(--color-marker-orange)' },
  { id: 'cemas', label: 'cemas', icon: AlertCircle, color: 'var(--color-burnt-sienna)' },
];

export function getMood(id: string): Mood {
  return MOODS.find((m) => m.id === id) ?? MOODS[2];
}
