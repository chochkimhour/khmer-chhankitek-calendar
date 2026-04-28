# khmer-chhankitek-calendar

![npm version](https://img.shields.io/npm/v/khmer-chhankitek-calendar?style=flat-square)
![license](https://img.shields.io/npm/l/khmer-chhankitek-calendar?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/khmer-chhankitek-calendar?style=flat-square)
![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)
![types](https://img.shields.io/badge/types-TypeScript-blue?style=flat-square)
![node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)
[![source](https://img.shields.io/badge/source-GitHub-black?style=flat-square)](https://github.com/chochkimhour/khmer-chhankitek-calendar)

Khmer Chhankitek calendar utilities for JavaScript and TypeScript.

This package converts Gregorian dates to Khmer lunar dates, formats Khmer and English calendar text, detects `ថ្ងៃសីល`, returns Khmer public and lunar holidays, and works in modern Node.js and browser-based applications.

## Why Developers Use It

- Simple API with predictable output
- Works in JavaScript and TypeScript
- Suitable for backend and frontend applications
- Useful for Khmer calendar UI, holiday logic, reports, dashboards, payroll tools, school systems, and business apps
- No runtime dependencies

## Features

- Convert Gregorian dates to Khmer lunar calendar dates from `1900-01-01` onward
- Return structured Khmer calendar data for each date
- Format calendar output in Khmer or English
- Detect `ថ្ងៃសីល`
- Include Khmer observance text in `fullText`
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
// ថ្ងៃសុក្រ ១៥កើត ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ ត្រូវនឹងថ្ងៃទី១ ខែឧសភា ឆ្នាំ២០២៦ថ្ងៃនេះ ជាថ្ងៃសីល និងពេញបូណ៌មី

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

### Format Khmer text

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-16');
// ថ្ងៃសៅរ៍ ១៥រោច ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០
```

### Format English text

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-16', { locale: 'en' });
// Saturday, 15 Waning of Vesak, Year of the Horse, Atthasak, BE 2570
```

### Include Gregorian date

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-12-09', {
  includeGregorianDate: true,
});
// ថ្ងៃពុធ ១៥រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០ ត្រូវនឹងថ្ងៃទី៩ ខែធ្នូ ឆ្នាំ២០២៦
```

### Include holiday names

```ts
import { formatKhmerDate } from 'khmer-chhankitek-calendar';

formatKhmerDate('2026-05-01', {
  includeHoliday: true,
});
// ថ្ងៃសុក្រ ១៥កើត ខែពិសាខ ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៦៩ [ទិវាពលកម្មអន្តរជាតិ, វិសាខបូជា]
```

### Get holidays for a year

```ts
import { getKhmerHolidays } from 'khmer-chhankitek-calendar';

const holidays = getKhmerHolidays(2026);

console.log(holidays.filter((holiday) => holiday.date === '2026-05-01'));
```

## Included Examples

This repository includes ready-to-read examples in the [examples](D:/Projects/khmer-chhankitek-calendar/examples) folder:

- [Node example](D:/Projects/khmer-chhankitek-calendar/examples/node.ts)
- [Browser example](D:/Projects/khmer-chhankitek-calendar/examples/browser.html)
- [Angular example](D:/Projects/khmer-chhankitek-calendar/examples/angular.component.ts)
- [React example](D:/Projects/khmer-chhankitek-calendar/examples/react.tsx)

## API

### `toKhmerLunarDate(date)`

Converts a Gregorian date into a Khmer lunar date object.

Accepted input:

- `Date`
- `string` in ISO format such as `'2026-05-01'`
- `number` timestamp

Returns:

```ts
interface KhmerLunarDate {
  gregorianDate: string;
  dayOfWeek: DayOfWeek;
  buddhistEraYear: number;
  khmerYear: number;
  khmerMonth: KhmerMonth;
  moonStatus: 'កើត' | 'រោច';
  moonDay: number;
  animalYear: AnimalYear;
  sak: Sak;
  isLeapMonth: boolean;
  isSilDay: boolean;
  holidays: KhmerHoliday[];
  fullText: string;
}
```

### `formatKhmerDate(date, options?)`

Formats a Gregorian date as Khmer or English text.

```ts
type FormatOptions = {
  locale?: 'km' | 'en';
  useKhmerNumbers?: boolean;
  includeGregorianDate?: boolean;
  includeHoliday?: boolean;
};
```

Notes:

- `locale` defaults to `'km'`
- `useKhmerNumbers` defaults to `true` for Khmer and `false` for English
- `includeGregorianDate` appends the Gregorian date text
- `includeHoliday` appends holiday names when present

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
- `buddhistEraYear` changes later, at `១រោច ខែពិសាខ`
- `fullText` may include Khmer observance text such as `ថ្ងៃនេះ ជាថ្ងៃសីល` or `ថ្ងៃនេះ ជាថ្ងៃសីល និងពេញបូណ៌មី`

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

Copyright (c) 2026 Choch Kimhour.
