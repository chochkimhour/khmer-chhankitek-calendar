import { formatKhmerDate, getKhmerHolidays, toKhmerLunarDate } from '../src/index';

const sampleDate = '2026-04-14';

console.log('Khmer Lunar Date Object:');
console.log(toKhmerLunarDate(sampleDate));

console.log('\nKhmer formatted string:');
console.log(formatKhmerDate(sampleDate, { includeHoliday: true, includeGregorianDate: true }));

console.log('\nEnglish formatted string:');
console.log(
  formatKhmerDate(sampleDate, {
    locale: 'en',
    includeHoliday: true,
    includeGregorianDate: true,
  }),
);

console.log('\n2026 holiday preview:');
console.log(getKhmerHolidays(2026).slice(0, 5));
