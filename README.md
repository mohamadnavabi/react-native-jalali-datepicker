# react-native-jalali-date

Jalali date helper for react native

## Installation

```sh
npm install react-native-jalali-date
```

## Usage

```js
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Picker from 'react-native-jalali-date';

export default function App() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: 1372,
    month: 3,
    day: 12,
  });

  const onClose = () => setShowDatePicker(false);

  const onApply = () => {
    setShowDatePicker(false);
    console.log(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Pick Date</Text>
      </Pressable>

      <Modal
        isVisible={showDatePicker}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
        backdropOpacity={0.5}
        statusBarTranslucent
      >
        <SafeAreaView style={styles.modalContent}>
          <Picker
            minDate={{
              year: 1369,
              month: 8,
              day: 29,
            }}
            initDate={selectedDate}
            maxDate="TODAY"
            onChange={setSelectedDate}
            style={styles.picker}
          />

          <Pressable style={styles.button} onPress={onApply}>
            <Text style={styles.buttonText}>تایید</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4dc6ff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#ffffff',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#ffffff',
  },
  picker: {
    marginBottom: 50,
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
