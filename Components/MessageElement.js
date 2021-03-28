// Components/ConversationElement.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class MessageElement extends React.Component {
    render() {
        const message = this.props.message;

        return (
        <View style={styles.container}>
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
    container: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 3,
        marginTop: 10,
        padding: 5
    },
    title: {
        fontWeight: 'bold'
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default MessageElement