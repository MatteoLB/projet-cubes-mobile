import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connexion from './connexion'; 
import Inscription from './inscription'




const Stack = createStackNavigator(); 

const MyStack = () => {
  return (

      <Stack.Navigator initialRouteName="Authentification">
        <Stack.Screen name="Authentification" component={Auth} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
      </Stack.Navigator>

  );
}

const Auth = ({navigation}) => {


  return (

    <View style={styles.container}>
      <TouchableOpacity
              title="Connexion"
              onPress={() => navigation.navigate('Connexion')}
              style={styles.btn}>
             <Text style = {styles.submitButtonText}> CONNEXION </Text>
      </TouchableOpacity>


      <TouchableOpacity
                title="Inscription"
                onPress={() => navigation.navigate('Inscription')}
                style={styles.btn} >
         <Text style = {styles.submitButtonText}> INSCRIPTION </Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#1E90FF',
    padding: 10,
    margin: 15,
    height: 40,
    width: '90%'
  },
  submitButtonText: {
    color: "white",
    textAlign: 'center'
}
});


export default MyStack ; 