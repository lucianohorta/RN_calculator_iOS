import React from 'react';
import CalculatorScreen from './screens/CalculatorScreen';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class App extends React.Component {
  render() {
    return <CalculatorScreen />
  }
}

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
});
