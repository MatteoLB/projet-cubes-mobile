import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Text, FlatList, StatusBar } from 'react-native'
import { getAllConversationsFromApi } from '../API/apiCube';
import ConversationElement from '../Components/ConversationElement.js'

const mapStateToProps = (state) => {
    return { 
        userId: state.auth.account.id,
        token: state.auth.token
    };
}

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
        console.log('in component did mount', this.props.token, this.props.userId);

        let { userId, token } = this.props;
        getAllConversationsFromApi(userId, token).then(res => {
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
        console.log("props conversation", this.props);

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

export default connect(mapStateToProps)(Conversations)