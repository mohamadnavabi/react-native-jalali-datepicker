import { StyleSheet } from 'react-native';

export default StyleSheet.create<any>({
  container: (isLtr?: boolean) => ({
    flexDirection: isLtr ? 'row-reverse' : 'row',
  }),
  picker: (fontFamily?: string) => ({
    minWidth: '33.333%',
    maxHeight: 150,
    fontFamily,
  }),
});
