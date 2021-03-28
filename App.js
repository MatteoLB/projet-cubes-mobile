import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from './components/auth/auth'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'; 
import Store from './redux/store'

export default function App() {
  return (
    <Provider store={Store}>
          <NavigationContainer>
            <MyStack></MyStack>
          </NavigationContainer>
    </Provider>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
