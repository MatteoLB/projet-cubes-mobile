// Components/RessourceDetail.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'; 
import { addComment } from '../API/apiCube';
import { URL_API } from '../types'
import { useSelector } from 'react-redux'


export default function CommentForm(props) {
    const isAuth = useSelector(state => state.auth.isAuth)
    const idRessource = props.idRessource;
    const [content, setContent] = useState("");
    const [dispalyErr, setDisplayerr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const comment = async () => {
        if (content == "") {
            setErrMsg("Veuillez ecrire un commentaire")
            setDisplayerr(true)
            return
        }

        try {
            const res = addComment(idRessource, content);
            // const res = await fetch(URL_API + 'echanges/addComment', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json, */*',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ userId: 9, ressourceId: idRessource, content: content })
            // })

            const data = await res;
            console.log('retour log', JSON.stringify(data));
        } catch (error) {
            console.log('catch error', error);
            setErrMsg("Bad request")
            setDisplayerr(true)
        }
    
    }

    if (!isAuth ){
        return (
            <View>
                <Text style={styles.notLogged}>Veuillez vous connecter pour laisser un commentaire.</Text>
            </View>
        )
    } else if (isAuth){
        return (
            <View style={styles.container}>
                <TextInput onChangeText={setContent} value={content} placeholder="Votre Commentaire" style={styles.input} />
                <TouchableOpacity
                    title="Ajouter un commentaire"
                    onPress={() => comment()}
                    style={styles.btn} >
                    <Text style={styles.submitButtonText}> Envoyer </Text>
                </TouchableOpacity>
                {dispalyErr && <Text style={styles.err} >{errMsg}</Text>}

            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
    },
    title: {
        fontWeight: 'bold'
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: '#7493f7',
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
        marginBottom: 0,
        height: 40,
        borderColor: '#4871f7',
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    err: {
        color: "red"
    },
    notLogged: {
        paddingLeft: 5,
        paddingRight: 5, 
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
    }
})