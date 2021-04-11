import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, ActivityIndicator, Text, TextInput, FlatList, StatusBar } from 'react-native'
import { getOneConversationFromApi, sendNewMessageToApi } from '../API/apiCube';
import MessageElement from '../Components/MessageElement.js'


const mapStateToProps = (state, ownProps) => {
    console.log('map state to props', ownProps);
    return { 
        userId: state.auth.account.id,
        token: state.auth.token
    };
}

export class Messages extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: undefined,
            isLoading: true
        }
    }

    _sendMessage = (newMessage) => {

        let { userId, token } = this.props;
        let { idConversation } = this.props.route.params;
        
        console.log('data _sendMessage', this.props);
        if (newMessage != '') {
            sendNewMessageToApi({ userId: userId, content: newMessage, targetId: idConversation}, userId, token).then(res => {
                console.log('resultat send message', res);
                
                getOneConversationFromApi(this.props.route.params.idConversation).then(res => {
                    // console.log(res);
                    this.setState({
                        messages: res.messages,
                        isLoading: false
                    });
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    
    // récupérer l'id et le token du store, puis les envoyer à l'api
    componentDidMount() {
        getOneConversationFromApi(this.props.route.params.idConversation).then(res => {
            // console.log(res);
            this.setState({
                messages: res.messages,
                isLoading: false
            });
        });
    }

    render() {
        const { messages, isLoading } = this.state;
        const { userId } = this.props;
        let newMessage = '';

        // console.log(messages);

        if (!isLoading && messages != undefined)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar/>

                    <FlatList
                        data={messages}
                        keyExtractor={item => item.id_messages.toString()} 
                        renderItem={({item}) => <MessageElement userId={userId} message={item}/>}
                    />

                    <View style={styles.sendContainer}>
                        <TextInput style={styles.sendInput} onChangeText={(text) => newMessage = text} placeholder="Message..." />

                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress = {
                                () => this._sendMessage(newMessage)
                            }>
                            <Text style={styles.sendButtonText}> Envoyer </Text>
                        </TouchableOpacity>
                    </View>
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
      backgroundColor: 'rgb(248,248,248)'
    },
    sendContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 2
    },
    sendInput: {
        flex: 1,
        padding: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3
    },
    sendButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3
    },
    sendButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
})

export default connect(mapStateToProps)(Messages)
