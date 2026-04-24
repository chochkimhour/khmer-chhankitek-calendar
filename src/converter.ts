import {
  ANIMAL_YEARS,
  DAYS_OF_WEEK_KM,
  GREGORIAN_MONTHS_KM,
  MOON_STATUS_KM,
  SAKS,
} from './constants';
import type { AnimalYear, DayOfWeek, KhmerHoliday, KhmerLunarDate, KhmerMonth, Sak } from './types';
import { formatISODate, normalizeDate } from './utils/date';
import { toKhmerNumber } from './utils/khmer-number';

const KHMER_NEW_YEAR_MONTH = 4;
const KHMER_NEW_YEAR_DAY = 14;
const KHMER_EPOCH_YEAR = 1900;
const KHMER_EPOCH_MONTH = 2;
const KHMER_EPOCH_DAY = 1;
const NORMAL_KHMER_YEAR_DAYS = 354;
const LEAP_DAY_KHMER_YEAR_DAYS = 355;
const LEAP_MONTH_KHMER_YEAR_DAYS = 384;
const MONTH_LENGTH_SHORT = 29;
const MONTH_LENGTH_LONG = 30;

type KhmerYearType = 'normal' | 'leap-day' | 'leap-month';

interface KhmerCivilDate {
  khmerMonth: KhmerMonth;
  monthDay: number;
  monthLength: number;
  yearType: KhmerYearType;
}

const NORMAL_MONTHS_BY_NUMBER: KhmerMonth[] = [
  'មិគសិរ',
  'បុស្ស',
  'មាឃ',
  'ផល្គុន',
  'ចេត្រ',
  'ពិសាខ',
  'ជេស្ឋ',
  'អាសាឍ',
  'ស្រាពណ៍',
  'ភទ្របទ',
  'អស្សុជ',
  'កត្តិក',
];

const LEAP_MONTHS_BY_NUMBER: KhmerMonth[] = [
  'មិគសិរ',
  'បុស្ស',
  'មាឃ',
  'ផល្គុន',
  'ចេត្រ',
  'ពិសាខ',
  'ជេស្ឋ',
  'បឋមាសាឍ',
  'ទុតិយាសាឍ',
  'ស្រាពណ៍',
  'ភទ្របទ',
  'អស្សុជ',
  'កត្តិក',
];

const holidayCache = new Map<number, KhmerHoliday[]>();

const OFFICIAL_PUBLIC_HOLIDAY_OVERRIDES: Record<number, KhmerHoliday[]> = {
  2026: [
    createHoliday('2026-01-01', 'បុណ្យចូលឆ្នាំសកល', "International New Year's Day", 'public'),
    createHoliday(
      '2026-01-07',
      'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍',
      'Victory over Genocide Day',
      'public',
    ),
    createHoliday('2026-03-08', 'ទិវានារីអន្តរជាតិ', "International Women's Day", 'public'),
    createHoliday('2026-04-14', 'បុណ្យចូលឆ្នាំខ្មែរ', 'Khmer New Year', 'public'),
    createHoliday('2026-04-15', 'បុណ្យចូលឆ្នាំខ្មែរ', 'Khmer New Year', 'public'),
    createHoliday('2026-04-16', 'បុណ្យចូលឆ្នាំខ្មែរ', 'Khmer New Year', 'public'),
    createHoliday('2026-05-01', 'ទិវាពលកម្មអន្តរជាតិ', 'International Labour Day', 'public'),
    createHoliday('2026-05-01', 'វិសាខបូជា', 'Visak Bochea Day', 'public'),
    createHoliday('2026-05-05', 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', 'Royal Ploughing Ceremony', 'public'),
    createHoliday(
      '2026-05-14',
      'ព្រះរាជពិធីចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ',
      "King's Birthday",
      'public',
    ),
    createHoliday(
      '2026-06-18',
      'ព្រះរាជពិធីចម្រើនព្រះជន្ម សម្តេចព្រះមហាក្សត្រី',
      "Queen Mother's Birthday",
      'public',
    ),
    createHoliday('2026-09-24', 'ទិវារដ្ឋធម្មនុញ្ញ', 'Constitution Day', 'public'),
    createHoliday('2026-10-10', 'ព្រះរាជពិធីបុណ្យភ្ជុំបិណ្ឌ', 'Pchum Ben Festival', 'public'),
    createHoliday('2026-10-11', 'ព្រះរាជពិធីបុណ្យភ្ជុំបិណ្ឌ', 'Pchum Ben Festival', 'public'),
    createHoliday('2026-10-12', 'ព្រះរាជពិធីបុណ្យភ្ជុំបិណ្ឌ', 'Pchum Ben Festival', 'public'),
    createHoliday(
      '2026-10-15',
      'ទិវាគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ',
      "Commemoration Day of King's Father",
      'public',
    ),
    createHoliday('2026-10-29', 'ព្រះរាជពិធីគ្រងរាជ្យ', 'Coronation Day', 'public'),
    createHoliday('2026-11-09', 'បុណ្យឯករាជ្យជាតិ', 'Independence Day', 'public'),
    createHoliday('2026-11-23', 'ព្រះរាជពិធីបុណ្យអុំទូក', 'Water Festival', 'public'),
    createHoliday('2026-11-24', 'ព្រះរាជពិធីបុណ្យអុំទូក', 'Water Festival', 'public'),
    createHoliday('2026-11-25', 'ព្រះរាជពិធីបុណ្យអុំទូក', 'Water Festival', 'public'),
    createHoliday('2026-12-29', 'ទិវាសន្តិភាពនៅកម្ពុជា', 'Peace Day in Cambodia', 'public'),
  ],
};

function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function getKhmerReferenceYear(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return month > KHMER_NEW_YEAR_MONTH ||
    (month === KHMER_NEW_YEAR_MONTH && day >= KHMER_NEW_YEAR_DAY)
    ? year
    : year - 1;
}

function isOnOrAfterKhmerNewYear(date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return month > KHMER_NEW_YEAR_MONTH || (month === KHMER_NEW_YEAR_MONTH && day >= KHMER_NEW_YEAR_DAY);
}

function getAnimalYearForReferenceYear(referenceYear: number): AnimalYear {
  return ANIMAL_YEARS[mod(referenceYear - 2020, ANIMAL_YEARS.length)];
}

function getSakForReferenceYear(referenceYear: number): Sak {
  return SAKS[mod(referenceYear - 2019, SAKS.length)];
}

function isGregorianLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function getGregorianYearDays(year: number): number {
  return isGregorianLeapYear(year) ? 366 : 365;
}

function getBuddhistEraYearForCalculation(year: number): number {
  return year + 544;
}

function getAharkun(year: number): number {
  return Math.floor((getBuddhistEraYearForCalculation(year) * 292207 + 499) / 800) + 4;
}

function getAvoman(year: number): number {
  return (11 * getAharkun(year) + 25) % 692;
}

function getBodithey(year: number): number {
  const aharkun = getAharkun(year);
  return (Math.floor((11 * aharkun + 25) / 692) + aharkun + 29) % 30;
}

function isKhmerSolarLeapYear(year: number): boolean {
  const aharkunMod = (getBuddhistEraYearForCalculation(year) * 292207 + 499) % 800;
  return 800 - aharkunMod <= 207;
}

function getBoditheyLeapType(year: number): 0 | 1 | 2 | 3 {
  const avoman = getAvoman(year);
  const bodithey = getBodithey(year);
  let hasLeapMonth = bodithey >= 25 || bodithey <= 5;
  let hasLeapDay = false;

  if (isKhmerSolarLeapYear(year)) {
    hasLeapDay = avoman <= 126;
  } else if (avoman <= 137) {
    hasLeapDay = getAvoman(year + 1) !== 0;
  }

  if (bodithey === 25 && getBodithey(year + 1) === 5) {
    hasLeapMonth = false;
  }

  if (bodithey === 24 && getBodithey(year + 1) === 6) {
    hasLeapMonth = true;
  }

  if (hasLeapMonth && hasLeapDay) {
    return 3;
  }

  if (hasLeapMonth) {
    return 1;
  }

  return hasLeapDay ? 2 : 0;
}

function getKhmerYearType(year: number): KhmerYearType {
  const boditheyLeapType = getBoditheyLeapType(year);

  if (boditheyLeapType === 3 || boditheyLeapType === 1) {
    return 'leap-month';
  }

  if (boditheyLeapType === 2 || getBoditheyLeapType(year - 1) === 3) {
    return 'leap-day';
  }

  return 'normal';
}

function getKhmerYearDays(year: number): number {
  const yearType = getKhmerYearType(year);

  if (yearType === 'leap-month') {
    return LEAP_MONTH_KHMER_YEAR_DAYS;
  }

  return yearType === 'leap-day' ? LEAP_DAY_KHMER_YEAR_DAYS : NORMAL_KHMER_YEAR_DAYS;
}

function getMonthCount(year: number): number {
  return getKhmerYearType(year) === 'leap-month'
    ? LEAP_MONTHS_BY_NUMBER.length
    : NORMAL_MONTHS_BY_NUMBER.length;
}

function normalizeKhmerMonthNumber(month: number, year: number): number {
  const monthCount = getMonthCount(year);
  return mod(month - 1, monthCount) + 1;
}

function getKhmerMonthName(month: number, year: number): KhmerMonth {
  const normalizedMonth = normalizeKhmerMonthNumber(month, year);
  const months =
    getKhmerYearType(year) === 'leap-month' ? LEAP_MONTHS_BY_NUMBER : NORMAL_MONTHS_BY_NUMBER;
  return months[normalizedMonth - 1];
}

function getKhmerMonthLength(month: number, year: number): number {
  const normalizedMonth = normalizeKhmerMonthNumber(month, year);
  const yearType = getKhmerYearType(year);

  if (yearType === 'leap-month') {
    if (normalizedMonth === 8 || normalizedMonth === 9) {
      return MONTH_LENGTH_LONG;
    }

    const normalMonthNumber = normalizedMonth > 9 ? normalizedMonth - 1 : normalizedMonth;
    return normalMonthNumber % 2 === 0 ? MONTH_LENGTH_LONG : MONTH_LENGTH_SHORT;
  }

  if (normalizedMonth === 7) {
    return yearType === 'leap-day' ? MONTH_LENGTH_LONG : MONTH_LENGTH_SHORT;
  }

  return normalizedMonth % 2 === 0 ? MONTH_LENGTH_LONG : MONTH_LENGTH_SHORT;
}

function getDaysSinceStartOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  return Math.round((date.getTime() - startOfYear.getTime()) / 86_400_000);
}

function advanceKhmerCivilDate(
  month: number,
  day: number,
  year: number,
  days: number,
): { month: number; day: number } {
  let currentMonth = month;
  let currentDay = day;

  for (let i = 0; i < days; i += 1) {
    currentDay += 1;

    if (currentDay > getKhmerMonthLength(currentMonth, year)) {
      currentDay = 1;
      currentMonth = normalizeKhmerMonthNumber(currentMonth + 1, year);
    }
  }

  return { month: currentMonth, day: currentDay };
}

function getKhmerCivilDateAtGregorianYearStart(year: number): { month: number; day: number } {
  let month = KHMER_EPOCH_MONTH;
  let day = KHMER_EPOCH_DAY;

  for (let currentYear = KHMER_EPOCH_YEAR; currentYear < year; currentYear += 1) {
    day += getGregorianYearDays(currentYear) - getKhmerYearDays(currentYear);

    while (day > getKhmerMonthLength(month, currentYear)) {
      day -= getKhmerMonthLength(month, currentYear);
      month = normalizeKhmerMonthNumber(month + 1, currentYear);
    }

    while (day <= 0) {
      month = normalizeKhmerMonthNumber(month - 1, currentYear);
      day += getKhmerMonthLength(month, currentYear);
    }
  }

  return { month, day };
}

function getKhmerCivilDate(date: Date): KhmerCivilDate {
  const year = date.getFullYear();
  const yearStart = getKhmerCivilDateAtGregorianYearStart(year);
  const civilDate = advanceKhmerCivilDate(
    yearStart.month,
    yearStart.day,
    year,
    getDaysSinceStartOfYear(date),
  );
  const monthLength = getKhmerMonthLength(civilDate.month, year);

  return {
    khmerMonth: getKhmerMonthName(civilDate.month, year),
    monthDay: civilDate.day,
    monthLength,
    yearType: getKhmerYearType(year),
  };
}

function getMoonPhase(monthDay: number): {
  moonStatus: KhmerLunarDate['moonStatus'];
  moonDay: number;
} {
  const isWaxing = monthDay <= 15;

  return {
    moonStatus: isWaxing ? MOON_STATUS_KM.waxing : MOON_STATUS_KM.waning,
    moonDay: isWaxing ? monthDay : monthDay - 15,
  };
}

function isLeapAsadhaMonth(khmerMonth: KhmerMonth): boolean {
  return khmerMonth === 'បឋមាសាឍ' || khmerMonth === 'ទុតិយាសាឍ';
}

function isChetMonth(khmerMonth: KhmerMonth): boolean {
  return khmerMonth === 'ចេត្រ';
}

function isBuddhistHolyDay(monthDay: number, monthLength: number): boolean {
  return monthDay === 8 || monthDay === 15 || monthDay === 23 || monthDay === monthLength;
}

function buildKhmerFullText(
  date: Date,
  dayOfWeek: DayOfWeek,
  moonDay: number,
  moonStatus: KhmerLunarDate['moonStatus'],
  khmerMonth: KhmerMonth,
  animalYear: AnimalYear,
  sak: Sak,
  buddhistEraYear: number,
): string {
  const gregorianDayKhmer = toKhmerNumber(date.getDate());
  const gregorianMonthKm = GREGORIAN_MONTHS_KM[date.getMonth()];
  const gregorianYearKhmer = toKhmerNumber(date.getFullYear());

  return `ថ្ងៃ${dayOfWeek} ${toKhmerNumber(moonDay)}${moonStatus} ខែ${khmerMonth} ឆ្នាំ${animalYear} ${sak} ពុទ្ធសករាជ ${toKhmerNumber(buddhistEraYear)} ត្រូវនឹងថ្ងៃទី${gregorianDayKhmer} ខែ${gregorianMonthKm} ឆ្នាំ${gregorianYearKhmer}`;
}

function convertCore(date: Date): Omit<KhmerLunarDate, 'holidays'> {
  const referenceYear = getKhmerReferenceYear(date);
  const khmerCivilDate = getKhmerCivilDate(date);
  const { moonStatus, moonDay } = getMoonPhase(khmerCivilDate.monthDay);
  const buddhistEraYear =
    isOnOrAfterKhmerNewYear(date) && isChetMonth(khmerCivilDate.khmerMonth)
      ? referenceYear + 543
      : referenceYear + 544;
  const khmerYear = buddhistEraYear;
  const animalYear = getAnimalYearForReferenceYear(referenceYear);
  const sak = getSakForReferenceYear(referenceYear);
  const dayOfWeek = DAYS_OF_WEEK_KM[date.getDay()];
  const isSilDay = isBuddhistHolyDay(khmerCivilDate.monthDay, khmerCivilDate.monthLength);

  return {
    gregorianDate: formatISODate(date),
    dayOfWeek,
    buddhistEraYear,
    khmerYear,
    khmerMonth: khmerCivilDate.khmerMonth,
    moonStatus,
    moonDay,
    animalYear,
    sak,
    isLeapMonth: isLeapAsadhaMonth(khmerCivilDate.khmerMonth),
    isSilDay,
    fullText: buildKhmerFullText(
      date,
      dayOfWeek,
      moonDay,
      moonStatus,
      khmerCivilDate.khmerMonth,
      animalYear,
      sak,
      buddhistEraYear,
    ),
  };
}

function createHoliday(
  date: string,
  nameKm: string,
  nameEn: string,
  type: KhmerHoliday['type'],
): KhmerHoliday {
  return { date, nameKm, nameEn, type };
}

function cloneHoliday(holiday: KhmerHoliday): KhmerHoliday {
  return { ...holiday };
}

function addHoliday(accumulator: KhmerHoliday[], holiday: KhmerHoliday): void {
  const existingIndex = accumulator.findIndex(
    (item) =>
      item.date === holiday.date &&
      (item.nameEn === holiday.nameEn || item.nameKm === holiday.nameKm),
  );

  if (existingIndex === -1) {
    accumulator.push(holiday);
    return;
  }

  if (accumulator[existingIndex].type !== 'public' && holiday.type === 'public') {
    accumulator[existingIndex] = holiday;
  }
}

function addHolidayIfMatch(
  accumulator: KhmerHoliday[],
  lunarDate: Omit<KhmerLunarDate, 'holidays'>,
  gregorianDate: string,
): void {
  if (
    lunarDate.khmerMonth === 'មាឃ' &&
    lunarDate.moonStatus === 'កើត' &&
    lunarDate.moonDay === 15
  ) {
    addHoliday(accumulator, createHoliday(gregorianDate, 'មាឃបូជា', 'Meak Bochea', 'religious'));
  }

  if (
    lunarDate.khmerMonth === 'ពិសាខ' &&
    lunarDate.moonStatus === 'កើត' &&
    lunarDate.moonDay === 15
  ) {
    addHoliday(accumulator, createHoliday(gregorianDate, 'វិសាខបូជា', 'Visak Bochea', 'religious'));
  }

  if (
    lunarDate.khmerMonth === 'ពិសាខ' &&
    lunarDate.moonStatus === 'រោច' &&
    lunarDate.moonDay === 4
  ) {
    addHoliday(
      accumulator,
      createHoliday(
        gregorianDate,
        'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល',
        'Royal Ploughing Ceremony',
        'traditional',
      ),
    );
  }

  if (
    lunarDate.khmerMonth === 'ភទ្របទ' &&
    lunarDate.moonStatus === 'រោច' &&
    lunarDate.moonDay === 15
  ) {
    addHoliday(accumulator, createHoliday(gregorianDate, 'ភ្ជុំបិណ្ឌ', 'Pchum Ben', 'religious'));
  }

  if (
    lunarDate.khmerMonth === 'កត្តិក' &&
    lunarDate.moonStatus === 'កើត' &&
    [14, 15].includes(lunarDate.moonDay)
  ) {
    addHoliday(
      accumulator,
      createHoliday(gregorianDate, 'ព្រះរាជពិធីបុណ្យអុំទូក', 'Water Festival', 'traditional'),
    );
  }
}

function getFixedPublicHolidays(year: number): KhmerHoliday[] {
  return [
    createHoliday(`${year}-01-01`, 'បុណ្យចូលឆ្នាំសកល', "International New Year's Day", 'public'),
    createHoliday(
      `${year}-01-07`,
      'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍',
      'Victory over Genocide Day',
      'public',
    ),
    createHoliday(`${year}-03-08`, 'ទិវានារីអន្តរជាតិ', "International Women's Day", 'public'),
    ...getKhmerNewYearHolidays(year),
    createHoliday(`${year}-05-01`, 'ទិវាពលកម្មអន្តរជាតិ', 'International Labour Day', 'public'),
    createHoliday(
      `${year}-05-14`,
      'ព្រះរាជពិធីចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ',
      "King's Birthday",
      'public',
    ),
    createHoliday(
      `${year}-06-18`,
      'ព្រះរាជពិធីចម្រើនព្រះជន្ម ព្រះមហាក្សត្រី',
      "Queen Mother's Birthday",
      'public',
    ),
    createHoliday(`${year}-09-24`, 'ទិវារដ្ឋធម្មនុញ្ញ', 'Constitution Day', 'public'),
    createHoliday(
      `${year}-10-15`,
      'ទិវាគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ',
      "Commemoration Day of King's Father",
      'public',
    ),
    createHoliday(`${year}-10-29`, 'ព្រះរាជពិធីគ្រងរាជ្យ', 'Coronation Day', 'public'),
    createHoliday(`${year}-11-09`, 'បុណ្យឯករាជ្យជាតិ', 'Independence Day', 'public'),
  ];
}

function addDynamicLunarHolidays(year: number, holidays: KhmerHoliday[]): void {
  const cursor = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  while (cursor <= end) {
    const normalized = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
    const lunarDate = convertCore(normalized);
    addHolidayIfMatch(holidays, lunarDate, formatISODate(normalized));
    cursor.setDate(cursor.getDate() + 1);
  }
}

function addOfficialHolidayOverrides(year: number, holidays: KhmerHoliday[]): void {
  for (const holiday of OFFICIAL_PUBLIC_HOLIDAY_OVERRIDES[year] ?? []) {
    addHoliday(holidays, cloneHoliday(holiday));
  }
}

function cloneHolidays(holidays: KhmerHoliday[]): KhmerHoliday[] {
  return holidays.map(cloneHoliday);
}

function getKhmerNewYearHolidays(year: number): KhmerHoliday[] {
  const startDay = year % 4 === 0 ? 13 : 14;
  const totalDays = year % 4 === 0 ? 4 : 3;

  return Array.from({ length: totalDays }, (_, index) =>
    createHoliday(
      `${year}-04-${String(startDay + index).padStart(2, '0')}`,
      'បុណ្យចូលឆ្នាំខ្មែរ',
      'Khmer New Year',
      'public',
    ),
  );
}

function buildHolidaysForYear(year: number): KhmerHoliday[] {
  const holidays = getFixedPublicHolidays(year);

  addDynamicLunarHolidays(year, holidays);
  addOfficialHolidayOverrides(year, holidays);

  return holidays.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Converts a Gregorian date to a Khmer lunar date.
 *
 * This implementation is dynamic and uses astronomical new-moon estimation plus
 * Khmer New Year year-cycle rules. It is a major upgrade over the previous placeholder
 * implementation, though highly specialized edge cases of the traditional calendar may
 * still benefit from future refinement.
 */
export function toKhmerLunarDate(inputDate: Date | string | number): KhmerLunarDate {
  const date = normalizeDate(inputDate);
  const lunar = convertCore(date);
  const holidays = getKhmerHolidays(date.getFullYear()).filter(
    (holiday) => holiday.date === lunar.gregorianDate,
  );

  return {
    ...lunar,
    holidays,
  };
}

export function getKhmerMonth(inputDate: Date | string | number): KhmerMonth {
  return toKhmerLunarDate(inputDate).khmerMonth;
}

export function getKhmerYear(inputDate: Date | string | number): number {
  return toKhmerLunarDate(inputDate).khmerYear;
}

export function getAnimalYear(inputDate: Date | string | number): AnimalYear {
  return toKhmerLunarDate(inputDate).animalYear;
}

export function getSak(inputDate: Date | string | number): Sak {
  return toKhmerLunarDate(inputDate).sak;
}

export function isSilDay(inputDate: Date | string | number): boolean {
  return toKhmerLunarDate(inputDate).isSilDay;
}

export function getKhmerHolidays(year: number): KhmerHoliday[] {
  if (!Number.isInteger(year) || year < 1) {
    throw new Error('Invalid year provided.');
  }

  const cached = holidayCache.get(year);
  if (cached) {
    return cloneHolidays(cached);
  }

  const computed = buildHolidaysForYear(year);
  holidayCache.set(year, computed);
  return cloneHolidays(computed);
}
