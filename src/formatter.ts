import {
  ANIMAL_YEARS_EN_BY_KM,
  DAYS_OF_WEEK_EN_BY_KM,
  GREGORIAN_MONTHS_KM,
  KHMER_MONTHS_EN_BY_KM,
  MOON_STATUS_EN,
  SAKS_EN_BY_KM,
} from './constants';
import { toKhmerLunarDate } from './converter';
import type { DateInput, FormatOptions } from './types';
import { normalizeDate } from './utils/date';
import { toKhmerNumber } from './utils/khmer-number';

type DateFormat = NonNullable<FormatOptions['format']>;

function maybeKhmerNumber(value: number | string, enabled: boolean): string {
  return enabled ? toKhmerNumber(value) : String(value);
}

function getKhmerGregorianDateText(inputDate: DateInput, useKhmerNumbers: boolean): string {
  const date = normalizeDate(inputDate);
  const day = maybeKhmerNumber(date.getDate(), useKhmerNumbers);
  const month = GREGORIAN_MONTHS_KM[date.getMonth()];
  const year = maybeKhmerNumber(date.getFullYear(), useKhmerNumbers);

  return `ថ្ងៃទី${day} ខែ${month} ឆ្នាំ${year}`;
}

function formatKhmerLunarText(
  khmerDate: ReturnType<typeof toKhmerLunarDate>,
  format: DateFormat,
  useKhmerNumbers: boolean,
): string {
  const moonDay = maybeKhmerNumber(khmerDate.moonDay, useKhmerNumbers);
  const buddhistEraYear = maybeKhmerNumber(khmerDate.buddhistEraYear, useKhmerNumbers);

  switch (format) {
    case 'short':
      return `${moonDay}${khmerDate.moonStatus} ${khmerDate.khmerMonth} ${buddhistEraYear}`;
    case 'medium':
      return `${moonDay}${khmerDate.moonStatus} ខែ${khmerDate.khmerMonth} ព.ស. ${buddhistEraYear}`;
    case 'long':
      return `${moonDay}${khmerDate.moonStatus} ខែ${khmerDate.khmerMonth} ឆ្នាំ${khmerDate.animalYear} ${khmerDate.sak} ព.ស. ${buddhistEraYear}`;
    case 'full':
      return `ថ្ងៃ${khmerDate.dayOfWeek} ${moonDay}${khmerDate.moonStatus} ខែ${khmerDate.khmerMonth} ឆ្នាំ${khmerDate.animalYear} ${khmerDate.sak} ពុទ្ធសករាជ ${buddhistEraYear}`;
  }
}

function formatEnglishLunarText(
  khmerDate: ReturnType<typeof toKhmerLunarDate>,
  format: DateFormat,
): string {
  const monthEn = KHMER_MONTHS_EN_BY_KM[khmerDate.khmerMonth];
  const animalEn = ANIMAL_YEARS_EN_BY_KM[khmerDate.animalYear];
  const sakEn = SAKS_EN_BY_KM[khmerDate.sak];
  const dayNameEn = DAYS_OF_WEEK_EN_BY_KM[khmerDate.dayOfWeek];
  const moonStatusEn = MOON_STATUS_EN[khmerDate.moonStatus === 'កើត' ? 'waxing' : 'waning'];

  switch (format) {
    case 'short':
      return `${khmerDate.moonDay} ${moonStatusEn}, ${monthEn}, BE ${khmerDate.buddhistEraYear}`;
    case 'medium':
      return `${khmerDate.moonDay} ${moonStatusEn} of ${monthEn}, BE ${khmerDate.buddhistEraYear}`;
    case 'long':
      return `${khmerDate.moonDay} ${moonStatusEn} of ${monthEn}, Year of the ${animalEn}, ${sakEn}, BE ${khmerDate.buddhistEraYear}`;
    case 'full':
      return `${dayNameEn}, ${khmerDate.moonDay} ${moonStatusEn} of ${monthEn}, Year of the ${animalEn}, ${sakEn}, BE ${khmerDate.buddhistEraYear}`;
  }
}

export function formatKhmerDate(
  inputDate: DateInput,
  options: FormatOptions = {},
): string {
  const {
    locale = 'km',
    format = 'full',
    useKhmerNumbers = locale === 'km',
    includeGregorianDate = false,
    includeHoliday = false,
  } = options;

  const khmerDate = toKhmerLunarDate(inputDate);
  let result =
    locale === 'en'
      ? formatEnglishLunarText(khmerDate, format)
      : formatKhmerLunarText(khmerDate, format, useKhmerNumbers);

  if (includeGregorianDate) {
    result +=
      locale === 'en'
        ? ` (${khmerDate.gregorianDate})`
        : ` ត្រូវនឹង${getKhmerGregorianDateText(inputDate, useKhmerNumbers)}`;
  }

  if (includeHoliday && khmerDate.holidays.length > 0) {
    const holidayNames = khmerDate.holidays
      .map((holiday) => (locale === 'en' ? (holiday.nameEn ?? holiday.nameKm) : holiday.nameKm))
      .join(', ');

    result += ` [${holidayNames}]`;
  }

  return result;
}
