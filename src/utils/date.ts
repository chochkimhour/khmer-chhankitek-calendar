const ISO_DATE_ONLY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
export const MIN_SUPPORTED_GREGORIAN_YEAR = 1900;

function assertSupportedGregorianYear(year: number): void {
  if (year < MIN_SUPPORTED_GREGORIAN_YEAR) {
    throw new Error(`Dates before ${MIN_SUPPORTED_GREGORIAN_YEAR}-01-01 are not supported.`);
  }
}

/**
 * Normalizes an input date into a local calendar date at midnight.
 */
export function normalizeDate(date: Date | string | number): Date {
  if (date instanceof Date) {
    const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (Number.isNaN(normalized.getTime())) {
      throw new Error('Invalid date provided.');
    }
    assertSupportedGregorianYear(normalized.getFullYear());
    return normalized;
  }

  if (typeof date === 'string') {
    const match = ISO_DATE_ONLY_RE.exec(date.trim());
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]);
      const day = Number(match[3]);
      const normalized = new Date(year, month - 1, day);

      if (
        normalized.getFullYear() !== year ||
        normalized.getMonth() !== month - 1 ||
        normalized.getDate() !== day
      ) {
        throw new Error('Invalid date provided.');
      }

      assertSupportedGregorianYear(year);
      return normalized;
    }
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid date provided.');
  }

  assertSupportedGregorianYear(parsed.getFullYear());
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

/**
 * Formats a date to YYYY-MM-DD using local calendar fields.
 */
export function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}
