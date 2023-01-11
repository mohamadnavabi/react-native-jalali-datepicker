import React, { ReactChild, useEffect, useRef } from 'react';
import { requireNativeComponent, ViewStyle } from 'react-native';

const NativePicker = requireNativeComponent('JalaliDate');

let firstTimeOnChange = true;

interface Props {
  data: [{ value: string | number; label: string }];
  selectedValue: number | string;
  textColor?: string;
  textSize?: number;
  style?: ViewStyle;
  onValueChange: (_: any) => void;
  selectedIndex?: number;
  children?: ReactChild;
  name?: string;
}

const Picker = React.memo((props: Props) => {
  if (!props.data) {
    console.warn('data props is required!');
    return null;
  }

  const selectedIndex = props.data.findIndex(
    (x) => x?.value == props.selectedValue
  );

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

  const onValueChange = ({ nativeEvent: { data } }: any) => {
    if (props.onValueChange) props.onValueChange(data === -1 ? 0 : data);
    if (firstTimeOnChange) return (firstTimeOnChange = false);
  };

  return (
    <NativePicker
      {...props}
      onValueChange={onValueChange}
      data={props.data || []}
      isShowSelectBackground={false}
      selectedIndex={selectedIndex > -1 ? selectedIndex : 0}
    />
  );
});

export default Picker;
