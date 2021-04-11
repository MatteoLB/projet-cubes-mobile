// Components/RessourceElement.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import dateFormat from 'dateformat';

class RessourceElement extends React.Component {
  render() {
    const ressource = this.props.ressource;
    const displayDetailRessource = this.props.displayDetailRessource
    const date = dateFormat(ressource.post_date, "dd/mm/yyyy")
    return (
      <TouchableOpacity onPress={() => displayDetailRessource(ressource.id_posts, ressource.title, ressource.name, ressource.firstname, ressource.post_date, ressource.content)} style={styles.container}>
        <Text style={styles.title}>{ressource.title}</Text>
        <View style={styles.infos}>
          <Text style={styles.grey}>{ressource.name + ' - ' + ressource.firstname}</Text>
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
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontWeight: 'bold'
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  grey: {
    color: 'grey'
  }
})

export default RessourceElement