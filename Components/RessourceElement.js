// Components/RessourceElement.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Messages from '../Screens/Messages'
import dateFormat from 'dateformat';

class RessourceElement extends React.Component {
  render() {
    const ressource = this.props.ressource;
    const displayDetailRessource = this.props.displayDetailRessource
    const navigateMessage = this.props.navigateMessage
    const date = dateFormat(ressource.post_date, "dd/mm/yyyy")
    return (
      <TouchableOpacity onPress={() => displayDetailRessource(ressource.id_posts, ressource.title, ressource.name, ressource.firstname, ressource.post_date, ressource.content, ressource.id_users)} style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{ressource.title}</Text>
        </View>
        <View style={styles.infos}>
            <TouchableOpacity onPress={() => navigateMessage(ressource.id_users)}>
                <Text style={styles.grey}>{ressource.name + ' - ' + ressource.firstname}</Text>
            </TouchableOpacity>
          <Text style={styles.grey}>{date}</Text>
        </View>
        <View>
          <Text numberOfLines={5}>{ressource.content}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 2
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
    infos: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    grey: {
        color: 'grey'
    }
})

export default RessourceElement