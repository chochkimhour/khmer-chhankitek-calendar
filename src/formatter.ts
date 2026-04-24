import {
  ANIMAL_YEARS,
  ANIMAL_YEARS_EN,
  DAYS_OF_WEEK_EN,
  DAYS_OF_WEEK_KM,
  KHMER_MONTHS,
  KHMER_MONTHS_EN,
  MOON_STATUS_EN,
  SAKS,
  SAKS_EN,
} from './constants';
import { toKhmerLunarDate } from './converter';
import type { FormatOptions } from './types';
import { toKhmerNumber } from './utils/khmer-number';

function maybeKhmerNumber(value: number | string, enabled: boolean): string {
  return enabled ? toKhmerNumber(value) : String(value);
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
    const monthEn = KHMER_MONTHS_EN[KHMER_MONTHS.indexOf(khmerDate.khmerMonth)];
    const animalEn = ANIMAL_YEARS_EN[ANIMAL_YEARS.indexOf(khmerDate.animalYear)];
    const sakEn = SAKS_EN[SAKS.indexOf(khmerDate.sak)];
    const dayNameEn = DAYS_OF_WEEK_EN[DAYS_OF_WEEK_KM.indexOf(khmerDate.dayOfWeek)];

    result = `${dayNameEn}, ${maybeKhmerNumber(khmerDate.moonDay, false)} ${MOON_STATUS_EN[khmerDate.moonStatus === 'កើត' ? 'waxing' : 'waning']} of ${monthEn}, Year of the ${animalEn}, ${sakEn}, BE ${maybeKhmerNumber(khmerDate.buddhistEraYear, false)}`;
  } else {
    result = `ថ្ងៃ${khmerDate.dayOfWeek} ${maybeKhmerNumber(khmerDate.moonDay, useKhmerNumbers)}${khmerDate.moonStatus} ខែ${khmerDate.khmerMonth} ឆ្នាំ${khmerDate.animalYear} ${khmerDate.sak} ពុទ្ធសករាជ ${maybeKhmerNumber(khmerDate.buddhistEraYear, useKhmerNumbers)}`;
  }

  if (includeGregorianDate) {
    result +=
      locale === 'en'
        ? ` (${khmerDate.gregorianDate})`
        : ` ត្រូវនឹងថ្ងៃទី${maybeKhmerNumber(khmerDate.gregorianDate, useKhmerNumbers)}`;
  }

  if (includeHoliday && khmerDate.holidays.length > 0) {
    const holidayNames = khmerDate.holidays
      .map((holiday) => (locale === 'en' ? (holiday.nameEn ?? holiday.nameKm) : holiday.nameKm))
      .join(', ');

    result += locale === 'en' ? ` [${holidayNames}]` : ` [${holidayNames}]`;
  }

  return result;
}
