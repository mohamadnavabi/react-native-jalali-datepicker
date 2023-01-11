import React, { useEffect, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import { Picker as IOSPicker } from '@react-native-picker/picker';

let firstTimeOnChange = true;

interface Props {
  data: [{ value: string | number; label: string }];
  style?: ViewStyle;
  onValueChange: (_: any) => void;
  selectedValue: number | string;
}

const Picker: React.FC<Props> = (props: Props) => {
  if (!props.data) {
    console.warn('data props is required!');
    return null;
  }

  const prevDataLength = useRef(0);

  useEffect(() => {
    const dataLength = props.data.length;
    if (
      !firstTimeOnChange &&
      prevDataLength.current !== 0 &&
      prevDataLength.current !== dataLength
    )
      if (props.onValueChange) props.onValueChange(props.data[0]?.value);

    prevDataLength.current = dataLength;
  }, [props]);

  return (
    <View style={props.style}>
      <IOSPicker
        {...props}
        selectedValue={props.selectedValue ?? 0}
        onValueChange={(value: number | string) => {
          if (props.onValueChange) props.onValueChange(value);
          if (firstTimeOnChange) return (firstTimeOnChange = false);
        }}
      >
        {props.data.map((i, index) => (
          <IOSPicker.Item key={index} label={i.label} value={i.value} />
        ))}
      </IOSPicker>
    </View>
  );
};

export default Picker;
