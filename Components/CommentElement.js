// Components/CommentElement.js

import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import dateFormat from 'dateformat';

class CommentElement extends React.Component {
    render() {
        const comment = this.props.comment;
        const date = dateFormat(comment.date_comment, "dd/mm/yy HH:MM")

        return (
            <View style={styles.container}>
                <View style={styles.infos}>
                    <Text style={styles.grey}>{comment.name + ' - ' + comment.firstname}</Text>
                    <Text style={styles.greyItalic}>{date}</Text>
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
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        fontWeight: 'bold'
    },
    grey: {
        color: 'grey',
        fontSize: 11
    },
    greyItalic: {
        fontStyle: 'italic',
        color: 'grey',
        fontSize: 11
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default CommentElement