// Components/ConversationElement.js

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

class ConversationElement extends React.Component {
    render() {
        const {conversation, displayMessages } = this.props;
        console.log('conversation : ', conversation);

        return (
        <TouchableOpacity style={styles.container} onPress={() => { displayMessages(conversation.id) }} >
            <View>
                <Text style={styles.title}>{conversation.name + ' ' + conversation.firstname}</Text>
            </View>
            <View>
                <Text numberOfLines={5}>{conversation.content}</Text>
            </View>
        </TouchableOpacity>
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

export default ConversationElement