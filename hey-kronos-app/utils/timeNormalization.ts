/**
 * Normalizes various time duration inputs to minutes
 * Examples:
 *   "90" → 90
 *   "1.5" → 90
 *   "90m" → 90
 *   "1h 30m" → 90
 *   "1:30" → 90
 */
export function normalizeDuration(input: string): number | null {
  const trimmed = input.trim().toLowerCase();

  // Pattern 1: Plain number (minutes)
  const plainNumber = /^(\d+)$/;
  const match1 = trimmed.match(plainNumber);
  if (match1) {
    return parseInt(match1[1], 10);
  }

  // Pattern 2: Decimal (hours)
  const decimalHours = /^(\d+\.?\d*)$/;
  const match2 = trimmed.match(decimalHours);
  if (match2) {
    return Math.round(parseFloat(match2[1]) * 60);
  }

  // Pattern 3: "90m"
  const minutesOnly = /^(\d+)m$/;
  const match3 = trimmed.match(minutesOnly);
  if (match3) {
    return parseInt(match3[1], 10);
  }

  // Pattern 4: "1h 30m" or "1h30m"
  const hoursMinutes = /^(\d+)h\s*(\d+)m$/;
  const match4 = trimmed.match(hoursMinutes);
  if (match4) {
    const hours = parseInt(match4[1], 10);
    const minutes = parseInt(match4[2], 10);
    return hours * 60 + minutes;
  }

  // Pattern 5: "1h" (hours only)
  const hoursOnly = /^(\d+)h$/;
  const match5 = trimmed.match(hoursOnly);
  if (match5) {
    return parseInt(match5[1], 10) * 60;
  }

  // Pattern 6: "1:30" (hours:minutes)
  const colonFormat = /^(\d+):(\d+)$/;
  const match6 = trimmed.match(colonFormat);
  if (match6) {
    const hours = parseInt(match6[1], 10);
    const minutes = parseInt(match6[2], 10);
    return hours * 60 + minutes;
  }

  return null; // Invalid format
}

/**
 * Formats minutes to human-readable string
 * Examples:
 *   90 → "1h 30m"
 *   45 → "45m"
 *   120 → "2h"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

/**
 * Validates duration is within acceptable range
 */
export function validateDuration(minutes: number): boolean {
  return minutes >= 1 && minutes <= 1440; // 1 minute to 24 hours
}
