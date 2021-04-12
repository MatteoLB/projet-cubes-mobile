import React from 'react';
import Navigation from './Navigation/Navigation';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Store from './redux/store';


export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
