import React from 'react'
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Text, FlatList, StatusBar } from 'react-native'
import { getAllConversationsFromApi } from '../API/apiCube';
import ConversationElement from '../Components/ConversationElement.js'

export class Conversations extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
            conversations: undefined,
            isLoading: true
        }
    }

    _displayMessages = (idConversation) => {
        // console.log('display conversation #' + idConversation);
        this.props.navigation.navigate('Messages', { idConversation: idConversation });
    }
    
    // récupérer l'id et le token du store, puis les envoyer à l'api
    componentDidMount() {

        getAllConversationsFromApi().then(res => {
            // console.log(res);
            this.setState({
                conversations: res.conversations,
                isLoading: false
            });
        });
    }

    render() {
        const { conversations, isLoading } = this.state;
        // console.log(ressources);

        if (!isLoading && conversations != undefined)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar/>
                    <Text>Conversations :</Text>
                    <FlatList
                        data={conversations}
                        keyExtractor={item => item.id.toString()} 
                        renderItem={({item}) => <ConversationElement conversation={item} displayMessages={this._displayMessages} />}
                    />
                </SafeAreaView>
            )
        }
        else
        {
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
    container: {
      flex: 1,
      padding: 5
    }
})

export default Conversations