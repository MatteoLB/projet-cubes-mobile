// Navigation/Navigation.js
import React from 'react'
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Conversations from '../Screens/Conversations'
import Messages from '../Screens/Messages'
import RessourceDetail from '../Screens/RessourceDetail'
import RessourceMaj from '../Components/RessourceMaj'


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Components/auth/auth'
import { useSelector } from 'react-redux'

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

function Homepage() {
  return (
    <Tab.Navigator tabBarOptions={{
        labelStyle: {
          fontSize: 15,
        },
        inactiveBackgroundColor: 'rgb(240,240,240)',
        style: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabStyle: {
          paddingBottom: 15
        }
    }}>
      <Tab.Screen name="Accueil" component={Home}  />
      <Tab.Screen name="Connexion" component={Login} />
    </Tab.Navigator>
  );
}

function HomepageLogged() {
  //<Tab.Screen name="Profile" component={Profile}  /> <Tab.Screen name="Home" component={Home} />
  return (
    <Tab.Navigator tabBarOptions={{
        labelStyle: {
          fontSize: 15,
        },
        inactiveBackgroundColor: 'rgb(240,240,240)',
        style: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabStyle: {
          paddingBottom: 15
        }
    }}>

      <Tab.Screen name="Accueil" component={Home} />
      <Tab.Screen name="Conversations" component={ConversationsStackScreen} />
      <Tab.Screen name="Profil" component={Profile}  />
      
  
    </Tab.Navigator>
  );
}

export default function Navigation() {

  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <NavigationContainer>
      {
        // renvoie state.isAuth 
        !isAuth ? ( 
          <>
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="Homepage" component={Homepage} />
              <Stack.Screen name="RessourceDetail" component={RessourceDetail} />
              <Stack.Screen name="Connexion" component={Login} />
              <Stack.Screen name="RessourceMaj" component={RessourceMaj} />
              
             
            </Stack.Navigator>
          </>
        ) : (
          <>
              <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Homepage" component={HomepageLogged} />
                <Stack.Screen name="RessourceDetail" component={RessourceDetail} />
                <Stack.Screen name="Messages" component={Messages} />
                <Stack.Screen name="RessourceMaj" component={RessourceMaj} />
                
              </Stack.Navigator>
          </>
        )
      }
    </NavigationContainer>
  );
}