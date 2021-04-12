// Components/ConversationElement.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class MessageElement extends React.Component {
    render() {
        const message = this.props.message;
        const userId  = this.props.userId;
        
        return (
        <View style={[styles.message, (userId == message.author_id ? styles.messageUser : styles.messageTarget)]}>
            <View>
                <Text style={styles.title}>{message.author_name + ' ' + message.author_firstname}</Text>
            </View>
            <View>
                <Text>{message.content}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    message: {
        marginTop: 10,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        elevation: 4
    },
    messageUser: {
        backgroundColor: "lightblue",
        alignSelf: 'flex-end',
        borderRadius: 3,
    },
    messageTarget: {
        alignSelf: 'flex-start',
        borderRadius: 3,
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default MessageElement