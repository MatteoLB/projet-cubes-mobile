// Components/RessourceElement.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class RessourceElement extends React.Component {
    render() {
        const ressource = this.props.ressource;

        return (
        <View style={styles.container}>
            <Text style={styles.title}>{ressource.title}</Text>
            <View style={styles.infos}>
                <Text>{ressource.name + ' - ' + ressource.firstname}</Text>
                <Text>{ressource.post_date}</Text>
            </View>
            <View>
                <Text numberOfLines={5}>{ressource.content}</Text>
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

export default RessourceElement