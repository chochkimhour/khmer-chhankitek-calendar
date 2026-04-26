import {
  ANIMAL_YEARS_EN_BY_KM,
  DAYS_OF_WEEK_EN_BY_KM,
  GREGORIAN_MONTHS_KM,
  KHMER_MONTHS_EN_BY_KM,
  MOON_STATUS_EN,
  SAKS_EN_BY_KM,
} from './constants';
import { toKhmerLunarDate } from './converter';
import type { FormatOptions } from './types';
import { normalizeDate } from './utils/date';
import { toKhmerNumber } from './utils/khmer-number';

function maybeKhmerNumber(value: number | string, enabled: boolean): string {
  return enabled ? toKhmerNumber(value) : String(value);
}

function getKhmerGregorianDateText(inputDate: Date | string | number, useKhmerNumbers: boolean): string {
  const date = normalizeDate(inputDate);
  const day = maybeKhmerNumber(date.getDate(), useKhmerNumbers);
  const month = GREGORIAN_MONTHS_KM[date.getMonth()];
  const year = maybeKhmerNumber(date.getFullYear(), useKhmerNumbers);

  return `ថ្ងៃទី${day} ខែ${month} ឆ្នាំ${year}`;
}

export function formatKhmerDate(
  inputDate: Date | string | number,
  options: FormatOptions = {},
): string {
  const {
    locale = 'km',
    useKhmerNumbers = locale === 'km',
    includeGregorianDate = false,
    includeHoliday = false,
  } = options;

  const khmerDate = toKhmerLunarDate(inputDate);

  let result: string;

  if (locale === 'en') {
    const monthEn = KHMER_MONTHS_EN_BY_KM[khmerDate.khmerMonth];
    const animalEn = ANIMAL_YEARS_EN_BY_KM[khmerDate.animalYear];
    const sakEn = SAKS_EN_BY_KM[khmerDate.sak];
    const dayNameEn = DAYS_OF_WEEK_EN_BY_KM[khmerDate.dayOfWeek];

    result = `${dayNameEn}, ${maybeKhmerNumber(khmerDate.moonDay, false)} ${MOON_STATUS_EN[khmerDate.moonStatus === 'កើត' ? 'waxing' : 'waning']} of ${monthEn}, Year of the ${animalEn}, ${sakEn}, BE ${maybeKhmerNumber(khmerDate.buddhistEraYear, false)}`;
  } else {
    result = `ថ្ងៃ${khmerDate.dayOfWeek} ${maybeKhmerNumber(khmerDate.moonDay, useKhmerNumbers)}${khmerDate.moonStatus} ខែ${khmerDate.khmerMonth} ឆ្នាំ${khmerDate.animalYear} ${khmerDate.sak} ពុទ្ធសករាជ ${maybeKhmerNumber(khmerDate.buddhistEraYear, useKhmerNumbers)}`;
  }

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
