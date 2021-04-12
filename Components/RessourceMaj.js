import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { URL_API } from '../types';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';


const UpadateRessource = ({route, navigation }) => {

    const [ressource, setNewRess] = useState({})
    const {insert, idPost} = route.params


    console.log('idPost', idPost);

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [path, setpath] = useState("")
    const [visibility, setvisibility] = useState("")
    const [dispalyErr, setDisplayerr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [dispalySucces, setDisplaySucces] = useState(false)
    const [succesMsg, setSuccesMsg] = useState("")
    

    const token = useSelector(state => state.auth.token)
    const isAuth = useSelector(state => state.auth.isAuth)
    let idUser    
    if (isAuth) {
         idUser = useSelector(state => state.auth.account.id)
    }


    
    const setRessourse = async () => {
       let newRessource
        if (insert) {
             newRessource = {
                title: title ,
                content: content ,
                path: path ,
                visibility: visibility,
                id_users: idUser
            }
        } else {
             newRessource = {
                id_posts: ressource.id_posts, 
                title: (title != ressource.title && title != "" ? title : ressource.title  ),
                content: (content != ressource.content  && content != "" ? content : ressource.name  ),
                path: (path != ressource.path && path != "" ? path : ressource.path  ),
                visibility: (visibility != ressource.visibility && visibility != "" ? visibility : ressource.visibility  )
            }
        }   


        console.log("MAJ RESSOURCE", newRessource);

        try {

            const fetchdata = await fetch(URL_API+ `ressource/${(insert ? "create" : "update")}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRessource)
            })
            const res = await  fetchdata.json()

            console.log("RES UPDATE PROFIl", JSON.stringify(res) );

            if (fetchdata.status === 201) {
                if (insert) {
                    setDisplaySucces(true)
                    setSuccesMsg("Ajout de la ressource effectué")
                    setDisplaySucces(true)
                    setTimeout(() => {  navigation.navigate('Homepage') }, 2000);
                } else {
                    setDisplaySucces(true)
                    setSuccesMsg("Informations mises à jour avec succès")
                }
                
                
            }else {
                setErrMsg("Erreur lors de la mise à jour des données")
                setDisplayerr(true)
            }
            
        } catch (error) {
            console.log("ERROR UPDATE PROFIL", error );
        }
    }

    useEffect(() => {

        console.log('useefect');
        
        //Fontion asynchrone permettant de récuperer le profil de l'utilisateur 
        const getOneRessource = async () => {

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
                const url =  URL_API+ `ressource/${idPost}`
                const fetchData  = await fetch(url, data)
                const res = await fetchData.json()
                

                // on met à jour l'etat locale 
                console.log('REPONSE GET ONE RESSOURcE', res);
                setNewRess(res.ressource[0])
                setTitle(res.ressource[0].title)
                setpath(res.ressource[0].path)
                setContent(res.ressource[0].content)
                setvisibility(res.ressource[0].visibility.toString() )

                
            } catch (error) {
                console.log('ERROR  ONE RESSOURcE', error);
            }
        }
        if(insert == false){
            console.log('MODOFICATION D4UNE RESSOURCE');
            getOneRessource()
        }
    }, [])

    return (
        <>
        {isAuth && 
                    <ScrollView>
                    <Text>
                        {insert  ? "Ajouter une ressource" : `Mise à jour de la ressource ${ressource.title}`}
                    </Text>
                    <View>
                        <TextInput onChangeText={setTitle} value={title} placeholder=" Titre" style={styles.input} />
                        <TextInput onChangeText={setpath} value={path} placeholder=" Chemin image" style={styles.input} />
                        <TextInput onChangeText={setvisibility} value={visibility} placeholder=" Visibilité de la ressource "  style={styles.input} />
                        <TextInput onChangeText={setContent} value={content} placeholder=" Contenu" style={styles.input} />
                    </View>
        
                    <TouchableOpacity
                                    title="Modifier"
                                    onPress={() => setRessourse()}
                                    style={styles.submit} >
                                    <Text style={styles.submitButtonText}> Valider </Text>
                    </TouchableOpacity>
                    {dispalyErr && <Text style={styles.err} >{errMsg}</Text>}
                    {dispalySucces && <Text style={styles.succesMsg} >{succesMsg}</Text>}
                    
        
                </ScrollView>
        }
        {!isAuth && 
                <View>
                    <Text>Veuillez vous connecter pour pouvoir ajouter ou modifier une ressource</Text>
                </View>
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
    },
    btn: {
        backgroundColor: '#1E90FF',
        padding: 10,
        margin: 15,
        height: 40,
        width: '90%'
      },
  });

export default UpadateRessource ; 