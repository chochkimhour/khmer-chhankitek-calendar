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

  it('supports multiple Khmer output formats', () => {
    expect(formatKhmerDate('2026-05-16', { format: 'short' })).toBe('១៥រោច ពិសាខ ២៥៧០');
    expect(formatKhmerDate('2026-05-16', { format: 'medium' })).toBe(
      '១៥រោច ខែពិសាខ ព.ស. ២៥៧០',
    );
    expect(formatKhmerDate('2026-05-16', { format: 'long' })).toBe(
      '១៥រោច ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០',
    );
  });

  it('supports multiple English output formats', () => {
    expect(formatKhmerDate('2026-05-16', { locale: 'en', format: 'short' })).toBe(
      '15 Waning, Vesak, BE 2570',
    );
    expect(formatKhmerDate('2026-05-16', { locale: 'en', format: 'medium' })).toBe(
      '15 Waning of Vesak, BE 2570',
    );
    expect(formatKhmerDate('2026-05-16', { locale: 'en', format: 'long' })).toBe(
      '15 Waning of Vesak, Year of the Horse, Atthasak, BE 2570',
    );
  });

  it('supports Western digits in Khmer formatted output', () => {
    const result = formatKhmerDate('2026-05-16', {
      format: 'medium',
      useKhmerNumbers: false,
    });

    expect(result).toBe('15រោច ខែពិសាខ ព.ស. 2570');
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
