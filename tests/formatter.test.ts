import { describe, expect, it } from 'vitest';
import { formatKhmerDate } from '../src/formatter';

describe('formatter', () => {
  it('formats Khmer output by default', () => {
    const result = formatKhmerDate('2025-07-01');

    expect(result).toContain('ថ្ងៃអង្គារ');
    expect(result).toContain('៦កើត');
    expect(result).toContain('ខែអាសាឍ');
  });

  it('formats English output', () => {
    const result = formatKhmerDate('2025-07-01', { locale: 'en' });

    expect(result).toContain('Tuesday');
    expect(result).toContain('6 Waxing');
    expect(result).toContain('Asadha');
  });

  it('formats English weekday from the normalized calendar date', () => {
    const result = formatKhmerDate('2026-09-10', { locale: 'en' });

    expect(result).toContain('Thursday');
  });

  it('includes Gregorian date and holiday labels when requested', () => {
    const result = formatKhmerDate('2026-04-14', {
      locale: 'en',
      includeGregorianDate: true,
      includeHoliday: true,
    });

    expect(result).toContain('2026-04-14');
    expect(result).toContain('Khmer New Year');
  });

  it('renders Khmer Gregorian date text when requested', () => {
    const result = formatKhmerDate('2026-12-09', {
      includeGregorianDate: true,
    });

    expect(result).toContain('ត្រូវនឹងថ្ងៃទី៩ ខែធ្នូ ឆ្នាំ២០២៦');
  });
});
