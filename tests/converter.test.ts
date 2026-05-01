import { describe, expect, it } from 'vitest';
import {
  getAnimalYear,
  getKhmerHolidays,
  getKhmerMonth,
  getSak,
  isSilDay,
  toKhmerLunarDate,
} from '../src/converter';
import type { KhmerHoliday } from '../src/types';

function hasHoliday(holidays: KhmerHoliday[], date: string, nameEn: string): boolean {
  return holidays.some((holiday) => holiday.date === date && holiday.nameEn === nameEn);
}

describe('converter', () => {
  it('handles valid ISO date parsing without timezone drift', () => {
    const result = toKhmerLunarDate('2026-04-14');
    expect(result.gregorianDate).toBe('2026-04-14');
  });

  it('supports UTC ISO date-time input', () => {
    const result = toKhmerLunarDate('2026-05-01T00:00:00.000Z');

    expect(result.gregorianDate).toBe('2026-05-01');
    expect(result.khmerMonth).toBe('ពិសាខ');
    expect(result.moonStatus).toBe('កើត');
    expect(result.moonDay).toBe(15);
  });

  it('normalizes timezone-offset ISO date-time input by UTC date', () => {
    const result = toKhmerLunarDate('2026-05-01T23:30:00-02:00');

    expect(result.gregorianDate).toBe('2026-05-02');
  });

  it('supports Date object and timestamp inputs', () => {
    const dateObject = toKhmerLunarDate(new Date(2026, 4, 1));
    const timestamp = toKhmerLunarDate(new Date(2026, 4, 1).getTime());

    expect(dateObject.gregorianDate).toBe('2026-05-01');
    expect(timestamp.gregorianDate).toBe('2026-05-01');
  });

  it('throws on invalid date input', () => {
    expect(() => toKhmerLunarDate('invalid-date')).toThrow('Invalid date provided.');
    expect(() => toKhmerLunarDate('2026-02-30')).toThrow('Invalid date provided.');
    expect(() => toKhmerLunarDate('2026-02-30T00:00:00.000Z')).toThrow(
      'Invalid date provided.',
    );
  });

  it('rejects Gregorian dates before the supported epoch', () => {
    expect(() => toKhmerLunarDate('1899-12-31')).toThrow('Dates before 1900-01-01 are not supported.');
    expect(() => getKhmerHolidays(1899)).toThrow('Year must be 1900 or later.');
  });

  it('returns dynamic Khmer lunar data for a known real-world date', () => {
    const result = toKhmerLunarDate('2025-07-01');

    expect(result.dayOfWeek).toBe('អង្គារ');
    expect(result.khmerMonth).toBe('អាសាឍ');
    expect(result.moonStatus).toBe('កើត');
    expect(result.moonDay).toBe(6);
    expect(result.animalYear).toBe('ម្សាញ់');
    expect(result.sak).toBe('សប្តស័ក');
    expect(result.buddhistEraYear).toBe(2569);
  });

  it('matches the real-world Khmer lunar date for 2026-05-20', () => {
    const result = toKhmerLunarDate('2026-05-20');

    expect(result.dayOfWeek).toBe('ពុធ');
    expect(result.khmerMonth).toBe('ជេស្ឋ');
    expect(result.moonStatus).toBe('កើត');
    expect(result.moonDay).toBe(4);
    expect(result.moonDayKhmer).toBe('៤');
    expect(result.isLeapMonth).toBe(false);
    expect(result.buddhistEraYearKhmer).toBe('២៥៧០');
    expect(result.khmerYearKhmer).toBe('២៥៧០');
    expect(result.fullText).toBe(
      'ថ្ងៃពុធ ៤កើត ខែជេស្ឋ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី២០ ខែឧសភា ឆ្នាំ២០២៦',
    );
  });

  it('matches the real-world Khmer lunar date for 2026-09-10', () => {
    const result = toKhmerLunarDate('2026-09-10');

    expect(result.dayOfWeek).toBe('ព្រហស្បតិ៍');
    expect(result.khmerMonth).toBe('ស្រាពណ៍');
    expect(result.moonStatus).toBe('រោច');
    expect(result.moonDay).toBe(13);
    expect(result.fullText).toBe(
      'ថ្ងៃព្រហស្បតិ៍ ១៣រោច ខែស្រាពណ៍ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី១០ ខែកញ្ញា ឆ្នាំ២០២៦',
    );
  });

  it('uses first and second Asadha names in Khmer leap-month years', () => {
    const firstAsadha = toKhmerLunarDate('2026-07-03');
    const secondAsadha = toKhmerLunarDate('2026-07-16');

    expect(firstAsadha.khmerMonth).toBe('បឋមាសាឍ');
    expect(firstAsadha.isLeapMonth).toBe(true);
    expect(secondAsadha.khmerMonth).toBe('ទុតិយាសាឍ');
    expect(secondAsadha.isLeapMonth).toBe(true);
  });

  it('matches known lunar day sequence from a published 2026 calendar spot-check', () => {
    const result = toKhmerLunarDate('2026-03-01');

    expect(result.moonStatus).toBe('កើត');
    expect(result.moonDay).toBe(13);
    expect(result.khmerMonth).toBe('ផល្គុន');
  });

  it('updates animal year and sak at Khmer New Year boundary', () => {
    const result = toKhmerLunarDate('2026-04-14');

    expect(result.animalYear).toBe('មមី');
    expect(result.sak).toBe('អដ្ឋស័ក');
    expect(result.buddhistEraYear).toBe(2569);
  });

  it('uses the computed Songkran date for Khmer New Year boundaries', () => {
    const beforeBoundary = toKhmerLunarDate('2024-04-12');
    const onBoundary = toKhmerLunarDate('2024-04-13');

    expect(beforeBoundary.animalYear).toBe('ថោះ');
    expect(beforeBoundary.sak).toBe('បញ្ចស័ក');
    expect(onBoundary.animalYear).toBe('រោង');
    expect(onBoundary.sak).toBe('ឆស័ក');
  });

  it('keeps Buddhist Era year in the old year until Chet finishes', () => {
    const result = toKhmerLunarDate('2026-04-16');

    expect(result.dayOfWeek).toBe('ព្រហស្បតិ៍');
    expect(result.khmerMonth).toBe('ចេត្រ');
    expect(result.moonStatus).toBe('រោច');
    expect(result.moonDay).toBe(14);
    expect(result.animalYear).toBe('មមី');
    expect(result.sak).toBe('អដ្ឋស័ក');
    expect(result.buddhistEraYear).toBe(2569);
    expect(result.fullText).toBe(
      'ថ្ងៃព្រហស្បតិ៍ ១៤រោច ខែចេត្រ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១៦ ខែមេសា ឆ្នាំ២០២៦ ថ្ងៃនេះ ជាថ្ងៃសីល',
    );
  });

  it('moves Buddhist Era year at the Vesak month boundary', () => {
    const beforeBoundary = toKhmerLunarDate('2026-05-01');
    const onBoundary = toKhmerLunarDate('2026-05-02');

    expect(beforeBoundary.khmerMonth).toBe('ពិសាខ');
    expect(beforeBoundary.buddhistEraYear).toBe(2569);
    expect(onBoundary.khmerMonth).toBe('ពិសាខ');
    expect(onBoundary.buddhistEraYear).toBe(2570);
  });

  it('keeps the old Buddhist Era year through Vesak full moon and annotates the observance', () => {
    const result = toKhmerLunarDate('2026-05-01');

    expect(result.dayOfWeek).toBe('សុក្រ');
    expect(result.khmerMonth).toBe('ពិសាខ');
    expect(result.moonStatus).toBe('កើត');
    expect(result.moonDay).toBe(15);
    expect(result.isSilDay).toBe(true);
    expect(result.buddhistEraYear).toBe(2569);
    expect(result.khmerYear).toBe(2569);
    expect(result.lunarDateText).toBe(
      'ថ្ងៃសុក្រ ១៥កើត ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩',
    );
    expect(result.gregorianDateText).toBe('ថ្ងៃទី១ ខែឧសភា ឆ្នាំ២០២៦');
    expect(result.observanceText).toBe('ថ្ងៃនេះ ជាថ្ងៃសីល និងពេញបូណ៌មី');
    expect(result.fullText).toBe(
      'ថ្ងៃសុក្រ ១៥កើត ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១ ខែឧសភា ឆ្នាំ២០២៦ ថ្ងៃនេះ ជាថ្ងៃសីល និងពេញបូណ៌មី',
    );
  });

  it('returns split display text without observance text on normal days', () => {
    const result = toKhmerLunarDate('2026-05-20');

    expect(result.lunarDateText).toBe(
      'ថ្ងៃពុធ ៤កើត ខែជេស្ឋ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០',
    );
    expect(result.gregorianDateText).toBe('ថ្ងៃទី២០ ខែឧសភា ឆ្នាំ២០២៦');
    expect(result.gregorianDayText).toBe('២០');
    expect(result.gregorianMonthText).toBe('ឧសភា');
    expect(result.gregorianYearText).toBe('២០២៦');
    expect(result.observanceText).toBeUndefined();
    expect(result.fullText).toBe(`${result.lunarDateText} ត្រូវនឹង${result.gregorianDateText}`);
  });

  it('annotates waning holy days with the generic sil text', () => {
    const result = toKhmerLunarDate('2026-05-16');

    expect(result.dayOfWeek).toBe('សៅរ៍');
    expect(result.khmerMonth).toBe('ពិសាខ');
    expect(result.moonStatus).toBe('រោច');
    expect(result.moonDay).toBe(15);
    expect(result.isSilDay).toBe(true);
    expect(result.fullText).toBe(
      'ថ្ងៃសៅរ៍ ១៥រោច ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី១៦ ខែឧសភា ឆ្នាំ២០២៦ ថ្ងៃនេះ ជាថ្ងៃសីល',
    );
  });

  it('exposes helper accessors', () => {
    expect(getKhmerMonth('2025-07-01')).toBe('អាសាឍ');
    expect(getAnimalYear('2026-04-14')).toBe('មមី');
    expect(getSak('2026-04-14')).toBe('អដ្ឋស័ក');
    expect(isSilDay('2026-05-01')).toBe(true);
  });

  it('returns fixed and dynamic holidays for a year', () => {
    const holidays = getKhmerHolidays(2026);

    expect(hasHoliday(holidays, '2026-04-14', 'Khmer New Year')).toBe(true);
    expect(hasHoliday(holidays, '2026-05-01', 'Visak Bochea Day')).toBe(true);
    expect(hasHoliday(holidays, '2026-05-05', 'Royal Ploughing Ceremony')).toBe(true);
    expect(hasHoliday(holidays, '2026-10-12', 'Pchum Ben Festival')).toBe(true);
    expect(hasHoliday(holidays, '2026-11-25', 'Water Festival')).toBe(true);
    expect(hasHoliday(holidays, '2026-12-29', 'Peace Day in Cambodia')).toBe(true);
  });

  it('generates public lunar holidays dynamically for future years', () => {
    const holidays = getKhmerHolidays(2027);

    expect(hasHoliday(holidays, '2027-05-20', 'Visak Bochea Day')).toBe(true);
    expect(hasHoliday(holidays, '2027-05-24', 'Royal Ploughing Ceremony')).toBe(true);
    expect(hasHoliday(holidays, '2027-09-29', 'Pchum Ben Festival')).toBe(true);
    expect(hasHoliday(holidays, '2027-09-30', 'Pchum Ben Festival')).toBe(true);
    expect(hasHoliday(holidays, '2027-10-01', 'Pchum Ben Festival')).toBe(true);
    expect(hasHoliday(holidays, '2027-11-12', 'Water Festival')).toBe(true);
    expect(hasHoliday(holidays, '2027-11-13', 'Water Festival')).toBe(true);
    expect(hasHoliday(holidays, '2027-11-14', 'Water Festival')).toBe(true);
    expect(hasHoliday(holidays, '2027-12-29', 'Peace Day in Cambodia')).toBe(true);
  });

  it('uses four Khmer New Year days in Gregorian leap years', () => {
    const holidays2024 = getKhmerHolidays(2024).filter(
      (holiday) => holiday.nameEn === 'Khmer New Year',
    );
    const holidays2025 = getKhmerHolidays(2025).filter(
      (holiday) => holiday.nameEn === 'Khmer New Year',
    );
    const holidays2028 = getKhmerHolidays(2028).filter(
      (holiday) => holiday.nameEn === 'Khmer New Year',
    );

    expect(holidays2024.map((holiday) => holiday.date)).toEqual([
      '2024-04-13',
      '2024-04-14',
      '2024-04-15',
      '2024-04-16',
    ]);
    expect(holidays2025.map((holiday) => holiday.date)).toEqual(['2025-04-14', '2025-04-15', '2025-04-16']);
    expect(holidays2028.map((holiday) => holiday.date)).toEqual([
      '2028-04-13',
      '2028-04-14',
      '2028-04-15',
      '2028-04-16',
    ]);
  });

  it('keeps cached holiday data isolated from caller mutation', () => {
    const holidays = getKhmerHolidays(2026);
    holidays.length = 0;

    expect(getKhmerHolidays(2026).length).toBeGreaterThan(0);
  });

  it('deduplicates holidays by date and English name', () => {
    const holidays = toKhmerLunarDate('2026-06-18').holidays;

    expect(holidays.filter((holiday) => holiday.nameEn === "Queen Mother's Birthday")).toHaveLength(
      1,
    );
  });
});
