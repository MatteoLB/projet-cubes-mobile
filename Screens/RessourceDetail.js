// Components/RessourceDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { getCommentsFromApi } from '../API/apiCube';
import CommentElement from '../Components/CommentElement.js'
import CommentForm from '../Components/CommentForm.js'

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
        if (!isLoading && comments != undefined){
            return (
                <View style={styles.main_container}>
                    {/* <Text>Détail de la ressource {idRessource}</Text> */}
                    <TouchableOpacity
                    title="Ajouter un commentaire"
                    onPress={() => this.props.navigation.navigate("RessourceMaj", {insert: false, idPost: idRessource })}
                    style={styles.btn} >
                    <Text style={styles.submitButtonText}> modifier </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{titleRessource}</Text>
                    <View style={styles.infos}>
                        <Text>{nameRessource + ' - ' + firstNameRessource}</Text>
                        <Text>{dateRessource}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={5}>{contentRessource}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text>{comments.length} Commentaires</Text>
                        <FlatList
                            data={comments}
                            keyExtractor={item => item.id_comments.toString()}
                            renderItem={({ item }) => <CommentElement comment={item} />}
                        />
                        <CommentForm idRessource={idRessource}/>
                    </View>
                </View>
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
    },
    container: {
        borderWidth: 1,
        borderColor: "black",
    },
    title: {
        fontWeight: 'bold'
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default RessourceDetail