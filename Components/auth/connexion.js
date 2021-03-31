import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccesAction } from '../../redux/action/authAction';
import { URL_API } from '../../types';



export default function Connexion() {
  
    const dispatch = useDispatch()
    const auth = useSelector( state => state.auth)

    const [email, setEmail] = useState("insert@gmail.com")
    const [pwd, setPwd] = useState("test")
    const [dispalyErr, setDisplayerr] = useState(false)
    const [errMsg, setErrMsg] = useState("")

     const login = async (email, mdp) => {

      setDisplayerr(false)
         
         console.log( 'email', email );
         console.log( 'mdp', mdp );
        const body = {
            email : email,
            password: mdp
        }

        console.log('body', body);

        try {
            const res = await fetch(URL_API+'auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })

    
            const data = await res.json()
            console.log('retour log', JSON.stringify(data));

            if (res.status === 200){
              // on recupère les infos de l'utilisateur
              const account = {
                id: data.user_id
              }
              // on met à jour le store
              dispatch(loginSuccesAction(data.token, account))
              
              console.log('auth',  auth);
              // pussh component profil

            }else {
              setErrMsg("Mot de passe ou email incorrecte")
              setDisplayerr(true)
            }
            
            
        } catch (error) {
            console.log('catch error', error);
            setErrMsg("Bad request")
            setDisplayerr(true)
        }

    }
  return (
    <View style={styles.container}>
      <TextInput onChangeText={setEmail} value={email} placeholder=" Email" autoCompleteType="email" style={styles.input} />
      <TextInput onChangeText={setPwd} value={pwd}  placeholder=" Password" autoCompleteType="password" style={styles.input}  />
      <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => login(email, pwd)
               }>
               <Text style = {styles.submitButtonText}> Connexion </Text>
    </TouchableOpacity>
     { dispalyErr && <Text style={styles.err} >{errMsg}</Text>}
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
  input: {
    width: "90%", 
    margin: 15,
    height: 40,
    borderColor: '#1E90FF',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    margin: 15,
    height: 40,
    width: '90%'
 },
 submitButtonText: {
     color: "white",
     textAlign: 'center'
 },
 err: {
     color: "red"
 }
});