
import React, { Component } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { URL_API } from '../types'

// Femmme https://bootdey.com/img/Content/avatar/avatar3.png
// Homme https://bootdey.com/img/Content/avatar/avatar6.png

const getRole = (role) => {
    switch (role) {
        case 1:
            return "Utilisateur "
        case 2:
            return "Modérateur "
        case 3:
            return "Administraeur"
        case 4:
            return "Super Administrateur"
    }
}

const Profile = () => {

    // on crée un etat locale pour notre composent initialialisé à null 
    const [profile, setProfile] = useState({}) 

    //On récupère l'id et le token depuis le store avec le hooks useSelector
    const token = useSelector(state => state.auth.token)
    const idUser = useSelector(state => state.auth.account.id)

    // UseEffect permet de gérer le cycle de vie dans les composant pure (fait avec des fonction )
    useEffect(() => {

        //Fontion asynchrone permettant de récuperer le profil de l'utilisateur 
        const getProfile = async () => {

            // Paramètre Fetch 
            const data = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                }
            }
            

            try {
                //Utilisation de fetch pour faire nos appels à l'api
                const url =  URL_API+ `user/${idUser}/${idUser}`
                const fetchData  = await fetch(url, data)
                const res = await fetchData.json()
                

                // on met à jour l'etat locale 
                setProfile(res.users[0])
                console.log('REPONSE GET PROFILE', profile);
                
            } catch (error) {
                console.log('ERROR GET PROFILE', error);
            }

            
        }
        
        // on appel notre fonction qui consomme l'api 
        getProfile()

    }, [])

    return (
        <>
            {profile.firstname ?
    
                <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{profile.firstname } {profile.name } </Text>
                        <Text style={styles.info}>{getRole(profile.id_roles)}</Text>
                        <Text style={styles.description}>{profile.email }</Text>

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Modifier le Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            : 
            <Text>Loader</Text>
            }


        </>
    )
}


const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });

export default Profile
