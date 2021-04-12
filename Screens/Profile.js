
import React, { Component } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { color } from 'react-native-reanimated'
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

const getImage = (id) => {
    switch (id) {
        case 1:
            return "https://bootdey.com/img/Content/avatar/avatar6.png"
        case 2:
            return "https://bootdey.com/img/Content/avatar/avatar3.png"
    }
}

const Profile = () => {

    // on crée un etat locale pour notre composent initialialisé à null 
    const [profile, setProfile] = useState({}) 

    // afficher les champs de modification
    const [displayProfil, setDisplayProfil] = useState(false)
    const [displayMdp, setDisplayMdp] = useState(false)


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
                console.log('REPONSE GET PROFILE', res.users[0]);
                
            } catch (error) {
                console.log('ERROR GET PROFILE', error);
            }

            
        }
        
        // on appel notre fonction qui consomme l'api 
        getProfile()

    }, [])


   const  showProfile = () => {
        setDisplayMdp(false)
        setDisplayProfil(!displayProfil)
    }

    const  showMdp = () => {
        setDisplayMdp(true)
        setDisplayProfil(false)
    }

    return (
        <>
            {profile.firstname ?
                
                <View style={styles.container}>
                
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: getImage(profile.sex) }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{profile.firstname } {profile.name } </Text>
                        <Text style={styles.info}>{getRole(profile.id_roles)}</Text>
                        <Text style={styles.description}>{profile.email }</Text>

                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => showProfile()}
                        >
                            <Text style={styles.textBtn}>Modifier le Profile</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                {displayProfil && <UpdateProfil user={profile}/>}
            </View>
           
            : 
                <View style={styles.container}>
                    <Image
                        source={
                            require('../assets/loader.gif')
                        }
                        style={styles.loader}
                    />
                </View>
            }


        </>
    )
}


const UpdateProfil = ({user}) => {

    console.log("UpdateProfil user", user);

    const token = useSelector(state => state.auth.token)
    const idUser = useSelector(state => state.auth.account.id)

    const [nom, setNom] = useState("") //user.firstname
    const [prenom, setPrenom] = useState("") //user.name
    const [email, setEmail] = useState("") //user.email
    const [bDate, setBdate] = useState("") //user.birthdate
    const [ville, setVille] = useState("") //user.city
    const [cp, setCp] = useState("") // user.postcode
    const [dispalyErr, setDisplayerr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [dispalySucces, setDisplaySucces] = useState(false)
    const [succesMsg, setSuccesMsg] = useState("")
    const [dispalyLoad, setDisplayLoad] = useState(false)

    const setProfil = async () => {
        console.log('NAME', nom);
        const newUser = {
            name: (nom != user.firstname && nom != "" ? nom : user.firstname  ),
            firstname: (prenom != user.name  && prenom != "" ? prenom : user.name  ),
            email: (email != user.email && email != "" ? email : user.email  ),
            birhtdate: (bDate != user.birthdate && bDate != "" ? bDate : user.birthdate  ), 
            city: (ville != user.city && ville != "" ? ville : user.city  ),
            postcode: (cp != user.postcode && cp != "" ? cp : user.postcode  )
        }

        console.log("NEW USER", newUser);

        try {

            const fetchdata = await fetch(URL_API+ `user/${idUser}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            const res = await  fetchdata.json()

            console.log("RES UPDATE PROFIl", JSON.stringify(res) );

            if (fetchdata.status === 201) {
                setSuccesMsg("Informations mis à jour avec succès")
                setDisplaySucces(true)
            }else {
                setErrMsg("Erreur lors de la mise à jour des données")
                setDisplayerr(true)
            }
            
        } catch (error) {
            console.log("ERROR UPDATE PROFIl", error );
        }
    }

    return (
        <>
            <ScrollView style={styles.inputesProfil} >

                <TextInput onChangeText={setNom} value={nom} placeholder=" Nom" style={styles.input} />
                <TextInput onChangeText={setPrenom} value={prenom} placeholder=" Prénom" style={styles.input} />
                <TextInput onChangeText={setEmail} value={email} placeholder=" Email" autoCompleteType="email" style={styles.input} />
                <TextInput onChangeText={setBdate} value={bDate} placeholder=" Date de naissance " style={styles.input} />
                <TextInput onChangeText={setVille} value={ville} placeholder=" Ville" style={styles.input} />
                <TextInput onChangeText={setCp} value={cp} placeholder=" Code Postale" style={styles.input} autoCompleteType="cc-number" />

            </ScrollView>
            <TouchableOpacity
                title="Modifier"
                onPress={() => setProfil()}
                style={styles.submit} >
                <Text style={styles.submitButtonText}> Valider </Text>
            </TouchableOpacity>
            {dispalyLoad && <Image
                source={
                    require('../assets/loader.gif')
                }
                style={styles.loader}
            />}
        <View>
            {dispalyErr && <Text style={styles.err} >{errMsg}</Text>}
            {dispalySucces && <Text style={styles.succesMsg} >{succesMsg}</Text>}
        </View>
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
        flex: 1, 
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
      backgroundColor: "white",
      borderColor:  "#00BFFF",
      borderWidth: 1,
    },
    textBtn: {
        color: "#00BFFF",
    },
    loader: {
        height: 90,
        width: 90
    },
    err: {
        color: "red",
        textAlign: "center"
    },
    succesMsg : {
        color: "green",
        textAlign: "center"
    },
    inputesProfil: {
        flex: 1,
        
    },
    container: {
        flex: 1
    },
    input: {
        width: "90%", 
        margin: 15,
        height: 40,
        borderColor: '#00BFFF',
        borderWidth: 1, 
        },
    submit: {
        alignSelf:'center',
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    }
  });

export default Profile
