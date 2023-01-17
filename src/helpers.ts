import type {
  DateObject,
  DateProps,
  JalaliDatePickerProps,
  PickerDataType,
} from './JalaliDatePicker.presets';
import moment from 'moment-jalaali';

const START_DATE = { year: 1320, month: 1, day: 1 };
const DEFAULT_MONTH_DAYS = 31;

const todayMoment = moment().format('jYYYY/jM/jD').split('/');
const today: DateObject = {
  year: Number(todayMoment[0]),
  month: Number(todayMoment[1]),
  day: Number(todayMoment[2]),
};
const defaultMonths = [
  { value: 1, label: 'فروردین' },
  { value: 2, label: 'اردیبهشت' },
  { value: 3, label: 'خرداد' },
  { value: 4, label: 'تیر' },
  { value: 5, label: 'مرداد' },
  { value: 6, label: 'شهریور' },
  { value: 7, label: 'مهر' },
  { value: 8, label: 'آبان' },
  { value: 9, label: 'آذر' },
  { value: 10, label: 'دی' },
  { value: 11, label: 'بهمن' },
  { value: 12, label: 'اسفند' },
];

export const persianDigits = (text: string) => {
  const num: Record<string, string> = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };
  text = text.replace(/./g, function (c: string) {
    return num[c] || c;
  });
  return text;
};

export const getDate = (date: DateProps, defaultDay = today): DateObject => {
  if (typeof date === 'object') return date;
  else if (date === 'TODAY') return today;
  else return date ?? defaultDay;
};

export const getYears = (props: JalaliDatePickerProps): PickerDataType[] => {
  const minDate = getDate(props.minDate, START_DATE);
  const maxDate = getDate(props.maxDate);
  const start = minDate ?? { ...today, year: 1369 };
  const end = maxDate ?? { ...today, year: 1369 };
  const yearLength = Number(end?.year) - Number(start?.year) + 1;

  if (yearLength < 1) return [{ value: 0, label: '' }];

  return Array.from({ length: yearLength }, (_, index) => ({
    value: index + Number(start.year),
    label: persianDigits((index + Number(start.year)).toString()),
  }));
};

export const getMonths = (
  props: JalaliDatePickerProps,
  year: number | string
): PickerDataType[] => {
  const minDate = getDate(props.minDate, START_DATE);
  const maxDate = getDate(props.maxDate);
  let dMonths = defaultMonths;

  if (year == minDate.year)
    dMonths = dMonths.filter((item) => item.value >= minDate.month);
  if (year == maxDate.year)
    dMonths = dMonths.filter((item) => item.value <= maxDate.month);

  return dMonths;
};

export const getDays = (
  props: JalaliDatePickerProps,
  year: number | string,
  month: number | string
): PickerDataType[] => {
  const minDate = getDate(props.minDate, START_DATE);
  const maxDate = getDate(props.maxDate);
  let days = Array.from(
    {
      length: getTotalDays(year, month),
    },
    (_, index) => ({
      value: index + 1,
      label: persianDigits((index + 1).toString()),
    })
  );

  if (year == minDate.year && month == minDate.month)
    days = days.filter((item) => item.value >= minDate.day);
  if (year == maxDate.year && month == maxDate.month)
    days = days.filter((item) => item.value <= maxDate.day);

  return days;
};

const getTotalDays = (year: any, month: any): number => {
  if (year == 0) return DEFAULT_MONTH_DAYS;

  let days = moment.jDaysInMonth(year, month);
  while (
    moment(`${year}/${month}/${days}`, 'jYYYY/jM/jD').format('jYYYY/jMM/jDD') ==
    'Invalid date'
  )
    days--;

  return days;
};
