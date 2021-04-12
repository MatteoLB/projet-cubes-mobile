import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, RefreshControl, Picker, View, ActivityIndicator, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import { getRessourcesFromApi } from '../API/apiCube';
import RessourceElement from '../Components/RessourceElement.js'
import { connect } from 'react-redux'
import store from '../redux/store'

const mapStateToProps = (state) => {
    return { 
        userId: state.auth.account ? state.auth.account.id : null,
        token: state.auth ? state.auth.token : null,
        isAuth: state.auth.account ? true : false
    };
}

export class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ressources: undefined,
            isLoading: true,
            isAuth: false
        }
    }


    _filtrerRessources(selectedOption) {
        this.setState({
            ressources: undefined,
            isLoading: true
        });

        getRessourcesFromApi(selectedOption).then(res => {
            console.log(res);
            this.setState({
                ressources: res.ressources,
                isLoading: false
            });
        });
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

    _navigateMessage = (idConversation) => {
        this.props.navigation.navigate("Messages", { idConversation: idConversation });
    }

    _displayDetailRessource = (idRessource, titleRessource, nameRessource, firstNameRessource, dateRessource, contentRessource) => {
        this.props.navigation.navigate("RessourceDetail", { idRessource: idRessource, titleRessource: titleRessource, nameRessource: nameRessource, firstNameRessource: firstNameRessource, dateRessource: dateRessource, contentRessource: contentRessource })
    }

    render() {
        const { ressources, isLoading } = this.state;
        const { isAuth } = this.props;
        // console.log(ressources);
        console.log('home props', this.props);

        if (!isLoading && ressources != undefined)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar/>

                    <View style={{ backgroundColor: 'white', marginBottom: 10, elevation: 3}}>
                        <Picker
                            selectedValue={"all"}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) => this._filtrerRessources(itemValue)}
                        >
                            <Picker.Item label="Tout" value="all" />
                            <Picker.Item label="Récents" value="recent" />
                            <Picker.Item label="Anciens" value="ancien" />
                            {/* <Picker.Item label="Mes ressources" value="user" /> */}
                        </Picker>

                    </View>

                    <TouchableOpacity
                            title="Ajouter une ressource"
                            onPress={() => this.props.navigation.navigate("RessourceMaj", { insert: true })}
                            style={[styles.submit, isAuth ? styles.displayFlex : styles.displayNone]} >
                            <Text style={{ textAlign: 'center', color: 'white' , fontSize: 16}}> Ajouter  </Text>
                    </TouchableOpacity>

                    <FlatList
                        data={ressources}
                        keyExtractor={item => item.id_posts.toString()}
                        renderItem={({ item }) => <RessourceElement ressource={item} navigateMessage={this._navigateMessage} displayDetailRessource={this._displayDetailRessource}/>}
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
      backgroundColor: 'rgb(248,248,248)'
    },
    submit: {
        backgroundColor: '#1E90FF',
        padding: 8,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 3,
    },
    displayNone: {
        display: 'none'
    },
    display: {
        display: 'flex'
    }
  })

export default connect(mapStateToProps)(Home)
