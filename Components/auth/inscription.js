import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccesAction } from '../../redux/action/authAction';
import { URL_API } from '../../types';
import { useEffect } from 'react';

export default function Inscription({navigation}) {

  const auth = useSelector( state => state.auth)
  const dispatch = useDispatch()

  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [bDate, setBdate] = useState("")
  const [ville, setVille] = useState("")
  const [cp, setCp] = useState("")
  const [sexe, setSexe] = useState("")
  const [pwd, setPwd] = useState("")
  const [dispalyErr, setDisplayerr] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [dispalyLoad, setDisplayLoad] = useState(false)


  /*
  useEffect(() => {
    return () => {
      setNom(null)
      setPrenom(null)
      setEmail(null)
      setBdate(null)
      setVille(null)
      setCp(null)
      setErrMsg(null)
      setDisplayerr(null)
    }

  }) */

  
  const inscription = async () => {
    setDisplayLoad(true)

    if (nom == "") {
      setErrMsg("Le nom ne peut pas etre vide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return 
    }else if (prenom == "") {
      setErrMsg("Le prénom ne peut pas etre vide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return
    }else if (email == "") {
      setErrMsg("L'email ne peut pas etre vide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return
    }else if (bDate == "") {
      setErrMsg("La date de naissance  ne peut pas etre vide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return
    }else if (ville == "") {
      setErrMsg("La ville ne peut pas etre vide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return
    }else if (cp == "") {
      setErrMsg("Le code postale ne peut pas etre vide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return
    }else if (pwd == "") {
      setErrMsg("Veuillez insérer un mot de passe valide")
      setDisplayLoad(false)
      setDisplayerr(true)
      return
    }

    const user = {
      name: nom,
      firstname: prenom,
      email: email,
      password: pwd,
      birhtdate: bDate,
      sex: 1,
      social_status: 1,
      progression: 0,
      city: ville,
      postcode: cp,
      status: 0,
      id_roles: 1,
      id_social_status: 1
    }

    console.log("user ", user);

    try {
      const res1 = await fetch(URL_API+'auth/signin', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, */*',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
      })


      const data1 = await res1.json()
      console.log('retour log', JSON.stringify(data1));
      console.log('res1', JSON.stringify(res1));

      if (res1.status === 201){


      //////////////////////////////////////////////////////// CONNEXION
      const body = {
        email : email,
        password: pwd
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
          setDisplayLoad(false)
          
          console.log('auth',  auth);
          

        }else {
          setErrMsg("Mot de passe ou email incorrecte")
          setDisplayLoad(false)
          setDisplayerr(true)
        }
        
        
    } catch (error) {
        console.log('catch error', error);
        setDisplayLoad(false)
        setErrMsg("Bad request")
        setDisplayerr(true)
    }

      ////////////////////////////////////////////////////////
      setDisplayerr(false)

      }else {
        setDisplayLoad(false)
        setErrMsg("Création du compte impossible")
        setDisplayerr(true)
      }
      
      
  } catch (error) {
      console.log('catch error', error);
      setDisplayLoad(false)
      setErrMsg("Bad request")
      setDisplayerr(true)
  }
  }

  return (
    <ScrollView >

      <TextInput onChangeText={setNom} value={nom} placeholder=" Nom" style={styles.input} />
      <TextInput onChangeText={setPrenom} value={prenom}  placeholder=" Prénom"  style={styles.input}  />
      <TextInput onChangeText={setEmail} value={email} placeholder=" Email" autoCompleteType="email" style={styles.input} />
      <TextInput onChangeText={setBdate} value={bDate} placeholder=" Date de naissance AAAA-MM-JJ" style={styles.input} />
      <TextInput onChangeText={setVille} value={ville}placeholder=" Ville" style={styles.input} />
      <TextInput onChangeText={setCp} value={cp}  placeholder=" Code Postal"  style={styles.input} autoCompleteType="cc-number" />
      <TextInput onChangeText={setPwd} value={pwd} placeholder=" Mot de passe" style={styles.input} />

      <TouchableOpacity
        title="Inscription"
        onPress={() => inscription()}
        style={styles.btn} >
        <Text style={styles.submitButtonText}> VALIDER </Text>
      </TouchableOpacity>
      {dispalyLoad && <Image 
                source={
                  require('../../assets/loader.gif')
                 }
                 style={styles.loader}
              />}
      { dispalyErr && <Text style={styles.err} >{errMsg}</Text>}
    </ScrollView>
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
},
  input: {
  width: "90%", 
  margin: 15,
  height: 40,
  borderColor: '#1E90FF',
  borderWidth: 1, 
  },
  err: {
      color: "red"
  }, 
  loader: {
    height: 90,
    width: 90
  }
});