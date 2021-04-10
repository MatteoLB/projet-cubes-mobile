// Components/CommentElement.js

import React from 'react'
import { StyleSheet, View, Text} from 'react-native'

class CommentElement extends React.Component {
    render() {
        const comment = this.props.comment;

        return (
            <View style={styles.container}>
                <View style={styles.infos}>
                    <Text>{comment.name + ' - ' + comment.firstname}</Text>
                    <Text>{comment.date_comment}</Text>
                </View>
                <View>
                    <Text numberOfLines={5}>{comment.content}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default CommentElement