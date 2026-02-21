import { format, addDays, subDays, startOfDay, isSameDay, isToday } from 'date-fns';

/**
 * Formats date to YYYY-MM-DD for database storage
 */
export function formatDateForDB(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Formats date for display (e.g., "Monday, Feb 19")
 */
export function formatDateForDisplay(date: Date): string {
  return format(date, 'EEEE, MMM d');
}

/**
 * Get next/previous day
 */
export function getNextDay(date: Date): Date {
  return addDays(date, 1);
}

export function getPreviousDay(date: Date): Date {
  return subDays(date, 1);
}

/**
 * Calculate Y position on calendar based on time
 */
export function calculateYPosition(time: Date, hourHeight: number = 60): number {
  const minutes = time.getHours() * 60 + time.getMinutes();
  return minutes * (hourHeight / 60);
}

/**
 * Calculate height of timeblock based on duration
 */
export function calculateBlockHeight(durationMinutes: number, hourHeight: number = 60): number {
  return durationMinutes * (hourHeight / 60);
}

/**
 * Snap time to nearest interval (e.g., 15 minutes)
 */
export function snapToInterval(date: Date, intervalMinutes: number = 15): Date {
  const minutes = date.getMinutes();
  const snappedMinutes = Math.round(minutes / intervalMinutes) * intervalMinutes;
  const newDate = new Date(date);
  newDate.setMinutes(snappedMinutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
}