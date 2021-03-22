import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, FlatList } from 'react-native'
import { getRessourcesFromApi } from '../API/apiCube';
import RessourceElement from '../Components/RessourceElement.js'

export class Home extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            ressources: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getRessourcesFromApi().then(res => {
            // console.log(res);
            this.setState({
                ressources: res.ressources,
                isLoading: false
            });
        });
    }

    render() {
        const { ressources, isLoading } = this.state;
        // console.log(ressources);
        
        if (!isLoading && ressources != undefined)
        {
            return (
                <View style={styles.container}>
                    <Text>Ressources</Text>
                    <FlatList
                        data={ressources}
                        keyExtractor={item => item.id_posts.toString()}
                        renderItem={({item}) => <RessourceElement ressource={item}/>}
                    />
                </View>
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
      marginTop: 20
    }
  })

export default Home
