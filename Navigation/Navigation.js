// Navigation/Navigation.js
import React from 'react'
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Login from '../Screens/Login'
import isAuth from '../Services/AuthService'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      {
        !isAuth() ? (
          <>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          </>
        )
      }
    </NavigationContainer>
  );
}