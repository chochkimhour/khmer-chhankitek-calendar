# khmer-chhankitek-calendar

A TypeScript library for converting Gregorian dates to the Khmer Chhankitek calendar.

It provides Khmer lunar date conversion, Khmer and English formatting, holiday helpers, Khmer number conversion, and TypeScript types.

Created and maintained by **Choch Kimhour, Cambodia 🇰🇭**.

## Features

- Convert Gregorian dates to Khmer lunar dates from `1900-01-01` onward
- Return the main Khmer calendar details for each date
- Tell whether a date is a `ថ្ងៃសីល`
- Handle Khmer leap-month years correctly
- Format dates in Khmer or English
- Optionally include the Gregorian date and holiday labels in formatted output
- Return Cambodian public, religious, and traditional holidays
- Generate Khmer New Year holidays from Songkran-based calculation
- Convert Western digits to Khmer digits
- Include TypeScript declarations
- Support ESM, CommonJS, Node.js, and browser-based projects

## Installation

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

const result = toKhmerLunarDate('2026-04-16');

console.log(result.fullText);
// ថ្ងៃព្រហស្បតិ៍ ១៤រោច ខែចេត្រ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១៦ ខែមេសា ឆ្នាំ២០២៦

console.log(result.isSilDay);
// true

console.log(formatKhmerDate('2026-04-16', { locale: 'en' }));
// Thursday, 14 Waning of Chet, Year of the Horse, Atthasak, BE 2569
```

## Supported Input

Most public functions accept:

- `Date`
- ISO date string such as `'2026-04-16'`
- timestamp number

Use `YYYY-MM-DD` when you want an exact calendar date without timezone drift.

Supported Gregorian range:

- `1900-01-01` and later

Earlier dates throw an error because the algorithm uses a documented `1900-01-01` epoch.

## Main API

### `toKhmerLunarDate(date)`

Returns a structured Khmer lunar date object.

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const result = toKhmerLunarDate('2026-05-20');

console.log(result);
```

Example:

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

Formats a date as Khmer or English text.

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-12-09');
// ថ្ងៃពុធ ១៥រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០

formatKhmerDate('2026-12-09', {
  includeGregorianDate: true,
});
// ថ្ងៃពុធ ១៥រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី៩ ខែធ្នូ ឆ្នាំ២០២៦

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

- `locale: 'km'` returns Khmer text
- `locale: 'en'` returns English text
- `useKhmerNumbers` defaults to `true` for Khmer and `false` for English

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
```

Holiday shape:

```ts
interface KhmerHoliday {
  date: string;
  nameKm: string;
  nameEn?: string;
  type: 'public' | 'religious' | 'traditional';
}
```

Notes:

- Fixed public holidays are generated from the Gregorian year
- Lunar holidays such as Meak Bochea, Visak Bochea, Royal Ploughing Ceremony, Pchum Ben, and Water Festival are derived from Khmer lunar dates
- Khmer New Year holidays are derived from the Songkran calculation, not a fixed `% 4` rule
- Cambodian holiday observance can still change by official government announcement

### Khmer New Year Example

```ts
getKhmerHolidays(2026)
  .filter((holiday) => holiday.nameEn === 'Khmer New Year')
  .map((holiday) => holiday.date);
// ['2026-04-14', '2026-04-15', '2026-04-16']
```

In years with two `វនប័ត` days, Khmer New Year spans four days:

```ts
getKhmerHolidays(2024)
  .filter((holiday) => holiday.nameEn === 'Khmer New Year')
  .map((holiday) => holiday.date);
// ['2024-04-13', '2024-04-14', '2024-04-15', '2024-04-16']
```

## Year Boundary Behavior

`animalYear` and `sak` change at Khmer New Year.

`buddhistEraYear` can change later, at the transition from `ចេត្រ` to `ពិសាខ`.

Example:

```ts
toKhmerLunarDate('2026-04-16').buddhistEraYear;
// 2569

toKhmerLunarDate('2026-04-17').buddhistEraYear;
// 2570
```

## TypeScript

The package includes type declarations.

```ts
import type {
  FormatOptions,
  KhmerHoliday,
  KhmerLunarDate,
  KhmerMonth,
} from 'khmer-chhankitek-calendar';
```

Core types:

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

## Development

```bash
npm install
npm test
npm run typecheck
npm run lint
npm run build
```

Before publish:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## License

MIT
