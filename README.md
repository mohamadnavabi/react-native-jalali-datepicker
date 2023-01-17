# react-native-jalali-date

Jalali date picker for React Native both platform (Android and iOS)

<p align="center">
  <img src="https://github.com/mohamadnavabi/react-native-jalali-datepicker/example/Android.png?raw=true" width="300" max-width="300" title="Android example">
  <img src="https://github.com/mohamadnavabi/react-native-jalali-datepicker/example/iOS.png?raw=true" width="250" max-width="300" alt="iOS example">
</p>

## Installation

```sh
npm install react-native-jalali-date @react-native-picker/picker
```

```sh
yarn add react-native-jalali-date @react-native-picker/picker
```

## Usage

Usage [example](https://github.com/mohamadnavabi/react-native-jalali-datepicker/blob/master/example/src/App.tsx)

```js
import Picker from 'react-native-jalali-date';

const [selectedDate, setSelectedDate] = useState({
  year: 1372,
  month: 3,
  day: 12,
});

<Picker
  minDate={{
    year: 1369,
    month: 8,
    day: 29,
  }}
  initDate={selectedDate}
  maxDate="TODAY"
  onChange={(result) => {
    console.log(result);
    setSelectedDate(result);
  }}
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
