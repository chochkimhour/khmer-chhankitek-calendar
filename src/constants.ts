import type { AnimalYear, DayOfWeek, KhmerMonth, MoonStatus, Sak } from './types';

export const KHMER_MONTHS: KhmerMonth[] = [
  'ចេត្រ',
  'ពិសាខ',
  'ជេស្ឋ',
  'អាសាឍ',
  'បឋមាសាឍ',
  'ទុតិយាសាឍ',
  'ស្រាពណ៍',
  'ភទ្របទ',
  'អស្សុជ',
  'កត្តិក',
  'មិគសិរ',
  'បុស្ស',
  'មាឃ',
  'ផល្គុន',
];

export const KHMER_MONTHS_EN = [
  'Chet',
  'Vesak',
  'Jeṭṭha',
  'Asadha',
  'Pathamasadha',
  'Tutiyasadha',
  'Srapon',
  'Photrobot',
  'Assuj',
  'Kattik',
  'Migasir',
  'Pous',
  'Magha',
  'Phalguna',
] as const;

export const ANIMAL_YEARS: AnimalYear[] = [
  'ជូត',
  'ឆ្លូវ',
  'ខាល',
  'ថោះ',
  'រោង',
  'ម្សាញ់',
  'មមី',
  'មមែ',
  'វក',
  'រកា',
  'ច',
  'កុរ',
];

export const ANIMAL_YEARS_EN = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
] as const;

export const SAKS: Sak[] = [
  'ឯកស័ក',
  'ទោស័ក',
  'ត្រីស័ក',
  'ចត្វាស័ក',
  'បញ្ចស័ក',
  'ឆស័ក',
  'សប្តស័ក',
  'អដ្ឋស័ក',
  'នព្វស័ក',
  'សំរឹទ្ធិស័ក',
];

export const SAKS_EN = [
  'Aekasak',
  'Tosak',
  'Treisak',
  'Chatvasak',
  'Panchasak',
  'Chhasak',
  'Saptasak',
  'Atthasak',
  'Navasak',
  'Samriddhisak',
] as const;

export const MOON_STATUS_KM: Record<'waxing' | 'waning', MoonStatus> = {
  waxing: 'កើត',
  waning: 'រោច',
};

export const MOON_STATUS_EN: Record<'waxing' | 'waning', string> = {
  waxing: 'Waxing',
  waning: 'Waning',
};

export const DAYS_OF_WEEK_KM: DayOfWeek[] = [
  'អាទិត្យ',
  'ចន្ទ',
  'អង្គារ',
  'ពុធ',
  'ព្រហស្បតិ៍',
  'សុក្រ',
  'សៅរ៍',
];

export const DAYS_OF_WEEK_EN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const GREGORIAN_MONTHS_KM = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ',
] as const;
