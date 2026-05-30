// Same-day delivery cutoff logic, anchored to America/Toronto (GTA).
// Order by the cutoff (default 1pm) for same-day doorstep delivery.

const CUTOFF_HOUR = Number(process.env.NEXT_PUBLIC_SAMEDAY_CUTOFF_HOUR ?? '13');

/** Current wall-clock time in Toronto, regardless of server/client TZ. */
export function torontoNow(): Date {
  const s = new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' });
  return new Date(s);
}

export interface SameDayState {
  eligible: boolean;
  cutoffHour: number;
  /** ms remaining until today's cutoff (0 if passed) */
  msToCutoff: number;
  label: string;
}

export function sameDayState(now: Date = torontoNow()): SameDayState {
  const cutoff = new Date(now);
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  const ms = cutoff.getTime() - now.getTime();
  const eligible = ms > 0;
  return {
    eligible,
    cutoffHour: CUTOFF_HOUR,
    msToCutoff: Math.max(0, ms),
    label: eligible ? 'Same-day available' : 'Next-day delivery',
  };
}

export function formatCountdown(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export const cutoffLabel = (hour = CUTOFF_HOUR): string => {
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'am' : 'pm';
  return `${h12}${ampm}`;
};
