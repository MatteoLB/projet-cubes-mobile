import React from 'react'
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Text, FlatList, StatusBar } from 'react-native'
import { getOneConversationFromApi } from '../API/apiCube';
import MessageElement from '../Components/MessageElement.js'

export class Messages extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
            messages: undefined,
            isLoading: true
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

        if (!isLoading && messages != undefined)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar/>
                    <Text>Messages :</Text>
                    <FlatList
                        data={messages}
                        keyExtractor={item => item.id_messages.toString()} 
                        renderItem={({item}) => <MessageElement message={item}/>}
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

export default Messages
