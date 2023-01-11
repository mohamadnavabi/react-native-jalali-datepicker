import type { ViewStyle } from 'react-native';

export type ResultDateType = {
  year: number | string;
  month: number | string;
  day: number | string;
};

export type PickerDataType = {
  value: number | string;
  label: number | string;
};

enum today {
  TODAY = 'TODAY',
}

export type DateProps = ResultDateType | keyof typeof today | undefined;

export interface JalaliDatePickerProps {
  initDate?: DateProps;
  minDate?: DateProps;
  maxDate?: DateProps;
  style?: ViewStyle;
  pickerStyle?: ViewStyle;
  onChange: (arg: ResultDateType) => void;
  fontFamily?: string;
  isLtr?: boolean;
}

export type DateObject = {
  year: number | string;
  month: number | string;
  day: number | string;
};
