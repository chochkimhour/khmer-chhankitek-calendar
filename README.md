# khmer-chhankitek-calendar

![npm version](https://img.shields.io/npm/v/khmer-chhankitek-calendar?style=flat-square)
![license](https://img.shields.io/npm/l/khmer-chhankitek-calendar?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/khmer-chhankitek-calendar?style=flat-square)
![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)
![types](https://img.shields.io/badge/types-TypeScript-blue?style=flat-square)
![node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)
[![source](https://img.shields.io/badge/source-GitHub-black?style=flat-square)](https://github.com/chochkimhour/khmer-chhankitek-calendar)

Khmer Chhankitek calendar utilities for JavaScript and TypeScript.

This package converts Gregorian dates to Khmer lunar dates, formats Khmer and English calendar text in multiple output styles, detects observance days, returns Khmer public and lunar holidays, and works in modern Node.js and browser-based applications.

## Why Use It

- Simple API with predictable output
- Works in JavaScript and TypeScript
- Suitable for backend and frontend applications
- Useful for Khmer calendar UI, holiday logic, reports, dashboards, payroll tools, school systems, and business apps
- No runtime dependencies

## Features

- Convert Gregorian dates to Khmer lunar calendar dates from `1900-01-01` onward
- Return structured Khmer calendar data for each date, including ready-to-render split text fields
- Format calendar output in Khmer or English with `full`, `long`, `medium`, and `short` styles
- Detect observance days
- Include Khmer observance text as a separate field and in `fullText`
- Return Khmer public, religious, and traditional holidays
- Handle Khmer New Year boundaries with Songkran-based calculation
- Handle leap-month years
- Convert Western digits to Khmer digits
- Ship built-in TypeScript declarations
- Support ESM and CommonJS
- Have zero runtime dependencies

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

## Compatibility

You can use this package with:

- JavaScript
- TypeScript
- Node.js
- Browser bundlers
- Angular
- React
- Next.js
- Vue
- Nuxt
- Svelte
- Express

The package exports:

- ESM: `dist/index.js`
- CommonJS: `dist/index.cjs`
- Type definitions: `dist/index.d.ts`

## Quick Start

### JavaScript

```js
import { formatKhmerDate, toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const result = toKhmerLunarDate('2026-05-01');

console.log(result.fullText);

console.log(formatKhmerDate('2026-05-02', { locale: 'en' }));
// Saturday, 1 Waning of Vesak, Year of the Horse, Atthasak, BE 2570
```

### CommonJS

```js
const { toKhmerLunarDate, formatKhmerDate } = require('khmer-chhankitek-calendar');

const result = toKhmerLunarDate('2026-05-16');
console.log(result.isSilDay);
console.log(formatKhmerDate('2026-05-16'));
```

### TypeScript

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const result = toKhmerLunarDate('2026-05-20');

result.khmerMonth;
result.buddhistEraYear;
result.buddhistEraYearKhmer;
result.gregorianMonthText;
result.holidays;
```

## Basic Usage

### Convert a Gregorian date

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const result = toKhmerLunarDate('2026-05-20');

console.log(result);
```

```ts
{
  gregorianDate: '2026-05-20',
  dayOfWeek: 'Wednesday',
  buddhistEraYear: 2570,
  buddhistEraYearKhmer: '2570',
  khmerYear: 2570,
  khmerYearKhmer: '2570',
  khmerMonth: 'Jyeshtha',
  moonStatus: 'Waxing',
  moonDay: 4,
  moonDayKhmer: '4',
  animalYear: 'Horse',
  sak: 'Atthasak',
  isLeapMonth: false,
  isSilDay: false,
  holidays: [],
  lunarDateText: 'Wednesday, 4 Waxing of Jyeshtha, Year of the Horse, Atthasak, BE 2570',
  gregorianDateText: 'May 20, 2026',
  gregorianDayText: '20',
  gregorianMonthText: 'May',
  gregorianYearText: '2026',
  fullText: 'Wednesday, 4 Waxing of Jyeshtha, Year of the Horse, Atthasak, BE 2570, corresponding to May 20, 2026'
}
```

### Split display fields

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const result = toKhmerLunarDate('2026-05-01');

result.lunarDateText;

result.gregorianDateText;

result.gregorianDayText;

result.gregorianMonthText;

result.gregorianYearText;

result.buddhistEraYearKhmer;

result.khmerYearKhmer;

result.moonDayKhmer;

result.observanceText;

result.fullText;
```

Use these fields when you need to build your own UI layout:

| Field                | Example                                                    | Meaning                                        |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| `lunarDateText`      | `Friday, 15 Waxing of Vesak, Year of the Horse, Atthasak, BE 2569` | Full lunar date text                     |
| `gregorianDateText`  | `May 1, 2026`                                                    | Full Gregorian date text                 |
| `gregorianDayText`   | `1`                                                              | Gregorian day                             |
| `gregorianMonthText` | `May`                                                            | Gregorian month name                      |
| `gregorianYearText`  | `2026`                                                           | Gregorian year                            |
| `observanceText`     | `Observance day`                                                 | Present only when the date has observance text |
| `fullText`           | `Friday, 15 Waxing of Vesak, ...`                                | Combined display sentence                 |

### Supported date inputs

```ts
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

toKhmerLunarDate('2026-05-01'); // ISO date-only string
toKhmerLunarDate('2026-05-01T00:00:00.000Z'); // UTC ISO date-time string
toKhmerLunarDate('2026-05-01T07:00:00+07:00'); // ISO date-time string with offset
toKhmerLunarDate(new Date(2026, 4, 1)); // JavaScript Date object
toKhmerLunarDate(new Date(2026, 4, 1).getTime()); // timestamp
```

Date-only strings are treated as calendar dates. ISO date-time strings with `Z` or a timezone offset are normalized by UTC date fields so API values stay stable across runtime timezones.

### Format Khmer text

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-16');
```

### Format English text

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-16', { locale: 'en' });
// Saturday, 15 Waning of Vesak, Year of the Horse, Atthasak, BE 2570
```

### Choose output length

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-16', { format: 'full' });

formatKhmerDate('2026-05-16', { format: 'long' });

formatKhmerDate('2026-05-16', { format: 'medium' });

formatKhmerDate('2026-05-16', { format: 'short' });

formatKhmerDate('2026-05-16', { locale: 'en', format: 'short' });
// 15 Waning, Vesak, BE 2570
```

### Use Western digits in Khmer text

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-16', {
  format: 'medium',
  useKhmerNumbers: false,
});
```

### Include Gregorian date

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-12-09', {
  includeGregorianDate: true,
});
```

### Include holiday names

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-01', {
  includeHoliday: true,
});
```

### Get holidays for a year

```ts
import { getKhmerHolidays } from 'khmer-chhankitek-calendar';

const holidays = getKhmerHolidays(2026);

console.log(holidays.filter((holiday) => holiday.date === '2026-05-01'));
```

## Included Examples

This repository includes ready-to-read examples in the [examples](examples) folder:

- [Node example](examples/node.ts)
- [Browser example](examples/browser.html)
- [Angular example](examples/angular.component.ts)
- [React example](examples/react.tsx)

## API

### `toKhmerLunarDate(date)`

Converts a Gregorian date into a Khmer lunar date object.

Accepted input:

- `Date`
- `string` in ISO date-only format such as `'2026-05-01'`
- `string` in ISO date-time format with UTC or offset, such as `'2026-05-01T00:00:00.000Z'` or `'2026-05-01T07:00:00+07:00'`
- `number` timestamp

All date APIs accept the same `DateInput` type:

```ts
type DateInput = Date | string | number;
```

Returns:

```ts
interface KhmerLunarDate {
  gregorianDate: string;
  dayOfWeek: DayOfWeek;
  buddhistEraYear: number;
  buddhistEraYearKhmer: string;
  khmerYear: number;
  khmerYearKhmer: string;
  khmerMonth: KhmerMonth;
  moonStatus: string;
  moonDay: number;
  moonDayKhmer: string;
  animalYear: AnimalYear;
  sak: Sak;
  isLeapMonth: boolean;
  isSilDay: boolean;
  holidays: KhmerHoliday[];
  lunarDateText: string;
  gregorianDateText: string;
  gregorianDayText: string;
  gregorianMonthText: string;
  gregorianYearText: string;
  observanceText?: string;
  fullText: string;
}
```

### `formatKhmerDate(date, options?)`

Formats a Gregorian date as Khmer or English text.

```ts
type FormatOptions = {
  locale?: 'km' | 'en';
  format?: 'full' | 'long' | 'medium' | 'short';
  useKhmerNumbers?: boolean;
  includeGregorianDate?: boolean;
  includeHoliday?: boolean;
};
```

Notes:

- `locale` defaults to `'km'`
- `format` defaults to `'full'`
- `useKhmerNumbers` defaults to `true` for Khmer and `false` for English
- `includeGregorianDate` appends the Gregorian date text
- `includeHoliday` appends holiday names when present

Formatter output styles:

| Option   | Khmer example                                             |
| -------- | --------------------------------------------------------- |
| `full`   | `Saturday, 15 Waning of Vesak, Year of the Horse, Atthasak, BE 2570` |
| `long`   | `15 Waning of Vesak, Year of the Horse, Atthasak, BE 2570`          |
| `medium` | `15 Waning of Vesak, BE 2570`                                      |
| `short`  | `15 Waning, Vesak 2570`                                            |

### Helper Functions

```ts
getKhmerMonth(date);
getKhmerYear(date);
getAnimalYear(date);
getSak(date);
isSilDay(date);
getKhmerHolidays(year);
toKhmerNumber(value);
```

## Framework Example

### React / Next.js

```tsx
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

export function KhmerDateLabel() {
  return <p>{formatKhmerDate('2026-05-01')}</p>;
}
```

### Angular

```ts
import { Component } from '@angular/core';
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

@Component({
  selector: 'app-khmer-date',
  template: `<p>{{ khmerDate }}</p>`,
})
export class KhmerDateComponent {
  khmerDate = formatKhmerDate('2026-05-01');
}
```

### Node.js / Express

```js
import express from 'express';
import { toKhmerLunarDate } from 'khmer-chhankitek-calendar';

const app = express();

app.get('/khmer-date/:date', (req, res) => {
  res.json(toKhmerLunarDate(req.params.date));
});
```

## Year Boundary Notes

- `animalYear` and `sak` change at Khmer New Year
- `buddhistEraYear` changes later in the lunar year
- `fullText` may include observance text when applicable

Examples:

```ts
toKhmerLunarDate('2026-05-01').buddhistEraYear;
// 2569

toKhmerLunarDate('2026-05-02').buddhistEraYear;
// 2570
```

## Supported Range

- `1900-01-01` and later

Dates before `1900-01-01` throw an error.

## Publishing Notes

- The package is published as ESM and CommonJS
- TypeScript declarations are included
- Build output is generated into `dist/`
- Source code stays in `src/`

## License

MIT License.

Copyright (c) 2026.
