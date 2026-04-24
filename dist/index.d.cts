type KhmerMonth = 'ចេត្រ' | 'ពិសាខ' | 'ជេស្ឋ' | 'អាសាឍ' | 'បឋមាសាឍ' | 'ទុតិយាសាឍ' | 'ស្រាពណ៍' | 'ភទ្របទ' | 'អស្សុជ' | 'កត្តិក' | 'មិគសិរ' | 'បុស្ស' | 'មាឃ' | 'ផល្គុន';
type AnimalYear = 'ជូត' | 'ឆ្លូវ' | 'ខាល' | 'ថោះ' | 'រោង' | 'ម្សាញ់' | 'មមី' | 'មមែ' | 'វក' | 'រកា' | 'ច' | 'កុរ';
type Sak = 'ឯកស័ក' | 'ទោស័ក' | 'ត្រីស័ក' | 'ចត្វាស័ក' | 'បញ្ចស័ក' | 'ឆស័ក' | 'សប្តស័ក' | 'អដ្ឋស័ក' | 'នព្វស័ក' | 'សំរឹទ្ធិស័ក';
type MoonStatus = 'កើត' | 'រោច';
type DayOfWeek = 'អាទិត្យ' | 'ចន្ទ' | 'អង្គារ' | 'ពុធ' | 'ព្រហស្បតិ៍' | 'សុក្រ' | 'សៅរ៍';
interface KhmerHoliday {
    date: string;
    nameKm: string;
    nameEn?: string;
    type: 'public' | 'religious' | 'traditional';
}
interface KhmerLunarDate {
    gregorianDate: string;
    dayOfWeek: DayOfWeek;
    buddhistEraYear: number;
    khmerYear: number;
    khmerMonth: KhmerMonth;
    moonStatus: MoonStatus;
    moonDay: number;
    animalYear: AnimalYear;
    sak: Sak;
    isLeapMonth: boolean;
    isSilDay: boolean;
    holidays: KhmerHoliday[];
    fullText: string;
}
interface FormatOptions {
    locale?: 'km' | 'en';
    useKhmerNumbers?: boolean;
    includeGregorianDate?: boolean;
    includeHoliday?: boolean;
}

declare const KHMER_MONTHS: KhmerMonth[];
declare const KHMER_MONTHS_EN: readonly ["Chet", "Vesak", "Jeṭṭha", "Asadha", "Pathamasadha", "Tutiyasadha", "Srapon", "Photrobot", "Assuj", "Kattik", "Migasir", "Pous", "Magha", "Phalguna"];
declare const ANIMAL_YEARS: AnimalYear[];
declare const ANIMAL_YEARS_EN: readonly ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
declare const SAKS: Sak[];
declare const SAKS_EN: readonly ["Aekasak", "Tosak", "Treisak", "Chatvasak", "Panchasak", "Chhasak", "Saptasak", "Atthasak", "Navasak", "Samriddhisak"];
declare const MOON_STATUS_KM: Record<'waxing' | 'waning', MoonStatus>;
declare const MOON_STATUS_EN: Record<'waxing' | 'waning', string>;
declare const DAYS_OF_WEEK_KM: DayOfWeek[];
declare const DAYS_OF_WEEK_EN: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
declare const GREGORIAN_MONTHS_KM: readonly ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];

/**
 * Converts a Gregorian date to a Khmer lunar date.
 *
 * This implementation is dynamic and uses astronomical new-moon estimation plus
 * Khmer New Year year-cycle rules. It is a major upgrade over the previous placeholder
 * implementation, though highly specialized edge cases of the traditional calendar may
 * still benefit from future refinement.
 */
declare function toKhmerLunarDate(inputDate: Date | string | number): KhmerLunarDate;
declare function getKhmerMonth(inputDate: Date | string | number): KhmerMonth;
declare function getKhmerYear(inputDate: Date | string | number): number;
declare function getAnimalYear(inputDate: Date | string | number): AnimalYear;
declare function getSak(inputDate: Date | string | number): Sak;
declare function isSilDay(inputDate: Date | string | number): boolean;
declare function getKhmerHolidays(year: number): KhmerHoliday[];

declare function formatKhmerDate(inputDate: Date | string | number, options?: FormatOptions): string;

/**
 * Converts Western numbers (0-9) to Khmer numbers (០-៩).
 */
declare function toKhmerNumber(input: number | string): string;

export { ANIMAL_YEARS, ANIMAL_YEARS_EN, type AnimalYear, DAYS_OF_WEEK_EN, DAYS_OF_WEEK_KM, type DayOfWeek, type FormatOptions, GREGORIAN_MONTHS_KM, KHMER_MONTHS, KHMER_MONTHS_EN, type KhmerHoliday, type KhmerLunarDate, type KhmerMonth, MOON_STATUS_EN, MOON_STATUS_KM, type MoonStatus, SAKS, SAKS_EN, type Sak, formatKhmerDate, getAnimalYear, getKhmerHolidays, getKhmerMonth, getKhmerYear, getSak, isSilDay, toKhmerLunarDate, toKhmerNumber };
