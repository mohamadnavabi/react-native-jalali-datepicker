import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Picker } from './Picker';
import styles from './JalaliDatePicker.styles';
import type {
  JalaliDatePickerProps,
  PickerDataType,
} from './JalaliDatePicker.presets';
import { getDate, getDays, getMonths, getYears } from './helpers';

const JalaliDatePicker = (props: JalaliDatePickerProps) => {
  const [years] = useState<PickerDataType[]>(getYears(props));
  const [months, setMonths] = useState<PickerDataType[]>([]);
  const [days, setDays] = useState<PickerDataType[]>([]);

  const init = getDate(props.initDate, true);
  const [year, setYear] = useState(init.year);
  const [month, setMonth] = useState(init.month);
  const [day, setDay] = useState(init.day);

  useEffect(() => {
    if (props.onChange) props.onChange({ year, month, day });
  }, [year, month, day]);

  useEffect(() => setMonths(getMonths(props, year)), [years, year]);

  useEffect(() => setDays(getDays(props, year, month)), [months, month, year]);

  return (
    <View style={[styles.container(props.isLtr), props.style]}>
      {React.useMemo(
        () => (
          <Picker
            style={[styles.picker(props.fontFamily), props.pickerStyle]}
            selectedValue={day}
            data={days}
            onValueChange={setDay}
          />
        ),
        [day, days]
      )}
      {React.useMemo(
        () => (
          <Picker
            name="months"
            style={[styles.picker(props.fontFamily), props.pickerStyle]}
            selectedValue={month}
            data={months}
            onValueChange={setMonth}
          />
        ),
        [months, month]
      )}
      {React.useMemo(
        () => (
          <Picker
            style={[styles.picker(props.fontFamily), props.pickerStyle]}
            selectedValue={year}
            data={years}
            onValueChange={setYear}
          />
        ),
        [year, years]
      )}
    </View>
  );
};

export default JalaliDatePicker;
