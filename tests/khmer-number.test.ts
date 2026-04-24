import { describe, expect, it } from 'vitest';
import { toKhmerNumber } from '../src/utils/khmer-number';

describe('toKhmerNumber', () => {
  it('converts a number to Khmer digits', () => {
    expect(toKhmerNumber(1234567890)).toBe('១២៣៤៥៦៧៨៩០');
  });

  it('converts digits inside a string', () => {
    expect(toKhmerNumber('2026')).toBe('២០២៦');
  });

  it('keeps non-numeric characters intact', () => {
    expect(toKhmerNumber('Hello 123')).toBe('Hello ១២៣');
  });
});
