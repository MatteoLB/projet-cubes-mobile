// Components/RessourceDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { getCommentsFromApi } from '../API/apiCube';
import CommentElement from '../Components/CommentElement.js'
import CommentForm from '../Components/CommentForm.js'
import dateFormat from 'dateformat';

class RessourceDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getCommentsFromApi(this.props.route.params.idRessource).then(res => {
            // console.log(res);
            this.setState({
                comments: res.comments,
                isLoading: false
            });
        });
    }

    render() {
        const { idRessource, titleRessource, nameRessource, firstNameRessource, dateRessource, contentRessource }  = this.props.route.params;
        const { comments, isLoading } = this.state;
        const date = dateFormat(dateRessource, "dd/mm/yyyy") //
        if (!isLoading && comments != undefined){
            return (
                <SafeAreaView style={styles.main_container}>
                    {/* <Text>Détail de la ressource {idRessource}</Text> */}
                    <View elevation={5} style={styles.titleContainer}>
                        <Text style={styles.title}>{titleRessource}</Text>
                    </View>
                    
                    <View style={styles.infos}>
                        <Text style={styles.grey}>{nameRessource + ' - ' + firstNameRessource}</Text>
                        <Text style={styles.greyItalic}>{date}</Text>
                    </View>
                    <View>
                        <Text style={styles.contentText}>{contentRessource}</Text>
                    </View>
                    <TouchableOpacity
                        title="Ajouter un commentaire"
                        onPress={() => this.props.navigation.navigate("RessourceMaj", { insert: false, idPost: idRessource })}
                        style={styles.btn} >
                        <Text style={styles.submitButtonText}> Modifier </Text>
                    </TouchableOpacity>
                    <View >
                        <Text style={styles.commentLength}>{comments.length} Commentaires</Text>
                        <FlatList
                            data={comments}
                            keyExtractor={item => item.id_comments.toString()}
                            renderItem={({ item }) => <CommentElement comment={item} />}
                        />
                        <CommentForm idRessource={idRessource}/>
                    </View>
                </SafeAreaView>
            )
        }else {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main_container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    container: {
        borderWidth: 1,
        borderColor: "black",
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16,
        color: '#4871f7',
    },
    titleContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        borderTopColor: 'black',
        borderTopWidth: 0.8,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 8,
        backgroundColor: '#fff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    contentText: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    grey: {
        color: 'grey'
    },
    greyItalic: {
        fontStyle: 'italic',
        color: 'grey'
    },
    commentLength:{
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        borderTopColor: 'black',
        borderTopWidth: 0.8,
        marginTop: 5
    },
    btn: {
        backgroundColor: '#7493f7',
        padding: 5,
        margin: 15,
        width: '30%',
    },
    submitButtonText: {
        color: "white",
        textAlign: 'center'
    }
})

export default RessourceDetail