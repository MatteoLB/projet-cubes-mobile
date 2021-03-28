// Navigation/Navigation.js
import React from 'react'
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Conversations from '../Screens/Conversations'
import Messages from '../Screens/Messages'
import Login from '../Screens/Login'
import { getTokenAndIdUser } from '../Services/AuthService'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();
const ConversationsStack = createStackNavigator();

function ConversationsStackScreen() {
  return (
    <ConversationsStack.Navigator>
      <ConversationsStack.Screen name="Conversations" component={Conversations} />
      <ConversationsStack.Screen name="Messages" component={Messages} />
    </ConversationsStack.Navigator>
  );
}

export default function Navigation() {

  const user = getTokenAndIdUser();

  return (
    <NavigationContainer>
      {
        // renvoie state.isAuth 
        !user.isAuth ? ( 
          <>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Conversations" component={ConversationsStackScreen} />
              <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
          </>
        )
      }
    </NavigationContainer>
  );
}