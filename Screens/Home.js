import React from 'react'
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Text, FlatList, StatusBar } from 'react-native'
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
            console.log(res);
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
                <SafeAreaView style={styles.container}>
                    <StatusBar/>
                    <Text>Ressources</Text>
                    <FlatList
                        data={ressources}
                        keyExtractor={item => item.id_posts.toString()}
                        renderItem={({item}) => <RessourceElement ressource={item}/>}
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

export default Home
