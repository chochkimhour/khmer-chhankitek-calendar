# khmer-chhankitek-calendar

A small TypeScript library for converting Gregorian dates to the Khmer Chhankitek calendar, also known as the Khmer lunar calendar.

It returns Khmer lunar month, moon status (`កើត` / `រោច`), moon day, Buddhist Era year, animal year, sak, Sil day status, formatted Khmer/English text, and Cambodian holiday information.

Created by **Choch Kimhour** from Cambodia.

## Features

- Convert Gregorian dates to Khmer lunar dates
- Khmer month, moon status, moon day, animal year, sak, and Buddhist Era year
- Sil day detection
- Khmer leap-month support, including `បឋមាសាឍ` and `ទុតិយាសាឍ`
- Cambodian public, religious, and traditional holiday helpers
- Khmer and English date formatting
- Khmer number conversion
- TypeScript types included
- Works with Node.js, CommonJS, ESM, browsers, and frontend frameworks

## Install

```bash
npm install khmer-chhankitek-calendar
```

```bash
yarn add khmer-chhankitek-calendar
```

```bash
pnpm add khmer-chhankitek-calendar
```

## Quick Start

```ts
import { formatKhmerDate, toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const lunarDate = toKhmerLunarDate('2026-04-16');

console.log(lunarDate.fullText);
// ថ្ងៃព្រហស្បតិ៍ ១៤រោច ខែចេត្រ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១៦ ខែមេសា ឆ្នាំ២០២៦

console.log(lunarDate.isSilDay);
// true

console.log(formatKhmerDate('2026-04-16', { locale: 'en' }));
// Thursday, 14 Waning of Chet, Year of the Horse, Atthasak, BE 2569
```

## Date Input

Most functions accept:

- `Date`
- ISO date string, for example `'2026-04-16'`
- timestamp number

Use `YYYY-MM-DD` strings when you want an exact calendar date without timezone surprises.

Supported Gregorian range:

- `1900-01-01` and later
- Earlier dates throw an error because the calendar algorithm uses a documented 1900 epoch

```ts
toKhmerLunarDate('2026-05-20');
toKhmerLunarDate(new Date(2026, 4, 20));
toKhmerLunarDate(Date.now());
```

Invalid dates throw an error.

```ts
toKhmerLunarDate('2026-02-30');
// Error: Invalid date provided.
```

## API

### `toKhmerLunarDate(date)`

Converts a Gregorian date to a detailed Khmer lunar date object.

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const result = toKhmerLunarDate('2026-05-20');

console.log(result);
```

Example result:

```ts
{
  gregorianDate: '2026-05-20',
  dayOfWeek: 'ពុធ',
  buddhistEraYear: 2570,
  khmerYear: 2570,
  khmerMonth: 'ជេស្ឋ',
  moonStatus: 'កើត',
  moonDay: 4,
  animalYear: 'មមី',
  sak: 'អដ្ឋស័ក',
  isLeapMonth: false,
  isSilDay: false,
  holidays: [],
  fullText: 'ថ្ងៃពុធ ៤កើត ខែជេស្ឋ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី២០ ខែឧសភា ឆ្នាំ២០២៦'
}
```

### `formatKhmerDate(date, options?)`

Formats a date as a readable string.

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-12-09');
// ថ្ងៃពុធ ១៥រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០

formatKhmerDate('2026-12-09', {
  includeGregorianDate: true,
});
// ថ្ងៃពុធ ១៥រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី២០២៦-១២-០៩

formatKhmerDate('2026-12-09', {
  locale: 'en',
  includeGregorianDate: true,
});
// Wednesday, 15 Waning of Kattik, Year of the Horse, Atthasak, BE 2570 (2026-12-09)
```

Options:

```ts
type FormatOptions = {
  locale?: 'km' | 'en';
  useKhmerNumbers?: boolean;
  includeGregorianDate?: boolean;
  includeHoliday?: boolean;
};
```

Notes:

- `locale: 'km'` returns Khmer text. `km` is the ISO language code for Khmer.
- `locale: 'en'` returns English text.
- `kh` is a country code for Cambodia, not the Khmer language code.
- `useKhmerNumbers` defaults to `true` for Khmer and `false` for English.

### Helper Functions

```ts
import {
  getAnimalYear,
  getKhmerHolidays,
  getKhmerMonth,
  getKhmerYear,
  getSak,
  isSilDay,
  toKhmerNumber,
} from 'khmer-chhankitek-calendar';

getKhmerMonth('2026-04-16');
// ចេត្រ

getKhmerYear('2026-04-16');
// 2569

getAnimalYear('2026-04-16');
// មមី

getSak('2026-04-16');
// អដ្ឋស័ក

isSilDay('2026-04-16');
// true

toKhmerNumber(2026);
// ២០២៦

getKhmerHolidays(2026);
// KhmerHoliday[]
```

## Holidays

`getKhmerHolidays(year)` returns Cambodian holidays for a Gregorian year.

```ts
import { getKhmerHolidays } from 'khmer-chhankitek-calendar';

const holidays = getKhmerHolidays(2026);

console.log(holidays.filter((holiday) => holiday.date === '2026-05-01'));
// [
//   {
//     date: '2026-05-01',
//     nameKm: 'ទិវាពលកម្មអន្តរជាតិ',
//     nameEn: 'International Labour Day',
//     type: 'public'
//   },
//   {
//     date: '2026-05-01',
//     nameKm: 'វិសាខបូជា',
//     nameEn: 'Visak Bochea Day',
//     type: 'public'
//   }
// ]
```

Holiday type:

```ts
interface KhmerHoliday {
  date: string;
  nameKm: string;
  nameEn?: string;
  type: 'public' | 'religious' | 'traditional';
}
```

Holiday notes:

- Fixed public holidays are generated automatically for each Gregorian year.
- Lunar holidays such as Meak Bochea, Visak Bochea, Royal Ploughing Ceremony, Pchum Ben, and Water Festival are derived dynamically from Khmer lunar dates.
- Khmer New Year holidays are derived from the Khmer calendar Songkran calculation rather than a simple fixed-date rule.
- Cambodian public holidays can still change by official government announcement. If you find a mismatch with an official calendar, please report the date and source so it can be added to the test suite.

## Khmer New Year

Khmer New Year is returned as public holidays.

```ts
getKhmerHolidays(2026)
  .filter((holiday) => holiday.nameEn === 'Khmer New Year')
  .map((holiday) => holiday.date);
// ['2026-04-14', '2026-04-15', '2026-04-16']
```

In years where the Songkran calculation produces two `វនប័ត` days, Khmer New Year includes four days.

```ts
getKhmerHolidays(2024)
  .filter((holiday) => holiday.nameEn === 'Khmer New Year')
  .map((holiday) => holiday.date);
// ['2024-04-13', '2024-04-14', '2024-04-15', '2024-04-16']
```

## Buddhist Era Year Boundary

Animal year and sak can change at Khmer New Year, while the Buddhist Era year may still follow the lunar month boundary.

For example, this date is after Khmer New Year in the Gregorian calendar, but it is still in Khmer month `ចេត្រ`, so the Buddhist Era year remains `២៥៦៩`.

```ts
toKhmerLunarDate('2026-04-16').fullText;
// ថ្ងៃព្រហស្បតិ៍ ១៤រោច ខែចេត្រ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១៦ ខែមេសា ឆ្នាំ២០២៦
```

## Usage Examples

### Node.js / ESM

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

console.log(toKhmerLunarDate('2026-09-10').fullText);
```

### CommonJS

```js
const { toKhmerLunarDate } = require('khmer-chhankitek-calendar');

console.log(toKhmerLunarDate('2026-09-10').fullText);
```

### Browser / Bundler

```html
<script type="module">
  import { formatKhmerDate } from './dist/index.js';

  document.body.textContent = formatKhmerDate('2026-04-16', {
    includeGregorianDate: true,
    includeHoliday: true,
  });
</script>
```

For applications, use a bundler such as Vite, Next.js, Nuxt, Astro, webpack, Rollup, or similar.

## TypeScript

The package includes TypeScript declarations.

```ts
import type { FormatOptions, KhmerHoliday, KhmerLunarDate, KhmerMonth } from 'khmer-chhankitek-calendar';
```

Important types:

```ts
type MoonStatus = 'កើត' | 'រោច';

interface KhmerLunarDate {
  gregorianDate: string;
  dayOfWeek: string;
  buddhistEraYear: number;
  khmerYear: number;
  khmerMonth: KhmerMonth;
  moonStatus: MoonStatus;
  moonDay: number;
  animalYear: string;
  sak: string;
  isLeapMonth: boolean;
  isSilDay: boolean;
  holidays: KhmerHoliday[];
  fullText: string;
}
```

## Accuracy

This library uses a Khmer Chhankitek civil-calendar method based on traditional year types and month lengths. It does not simply count Gregorian days or rely on one fixed lunar-month pattern.

Validated examples include:

```txt
2026-04-16 -> ថ្ងៃព្រហស្បតិ៍ ១៤រោច ខែចេត្រ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១៦ ខែមេសា ឆ្នាំ២០២៦
2026-05-20 -> ថ្ងៃពុធ ៤កើត ខែជេស្ឋ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី២០ ខែឧសភា ឆ្នាំ២០២៦
2026-09-10 -> ថ្ងៃព្រហស្បតិ៍ ១៣រោច ខែស្រាពណ៍ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី១០ ខែកញ្ញា ឆ្នាំ២០២៦
2026-12-09 -> ថ្ងៃពុធ ១៥រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី៩ ខែធ្នូ ឆ្នាំ២០២៦
```

Traditional Khmer calendars and Cambodian public holidays can still contain official annual adjustments. If you find a mismatch with an official Cambodian calendar, please report the date and source so it can be added to the test suite.

## Development

```bash
npm install
npm test
npm run typecheck
npm run lint
npm run build
```

Scripts:

- `npm test`: run the test suite
- `npm run typecheck`: run TypeScript checks
- `npm run lint`: run ESLint
- `npm run build`: build ESM, CommonJS, and type declarations
- `npm run dev`: watch build

Before publishing, the package runs:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## License

MIT

## Author

Created and maintained by **Choch Kimhour** from Cambodia.
