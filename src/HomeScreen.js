import React from 'react';
import { ScrollView, TextInput, StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity, Button, StatusBar, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font } from 'expo';

import { getLeagues } from './api-client';
import { Liga } from './liga';
import { Loading } from './Loading'

export class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Ligas',
        header: null
    };

    state = {
        leagues: [],
        isLoading: true,
        search: "",
        fontLoaded: false,
    }

    async componentDidMount() {

        await Font.loadAsync({
            'helveticaneue': require('../assets/fonts/helveticaneue.ttf'),
        });

        this.setState({
            isLoading: true,
            fontLoaded: true
        });
        getLeagues().then((data) => {
            this.setState({
                leagues: data,
                isLoading: false
            });
        });
    }

    render() {
        let inputWidth = Dimensions.get('window').width - 48;
        return (
            this.state.fontLoaded ?
                (<View style={styles.container}>
                    <StatusBar barStyle="light-content" hidden={false} />
                    <Text style={styles.title}>Ligas</Text>
                    <View style={[styles.searchContainer, { width: inputWidth }]}>
                        <TextInput
                            style={[styles.searchInput]}
                            onChangeText={(text) => this.setState({ search: text })}
                            value={this.state.text}
                            underlineColorAndroid={'transparent'}
                            placeholder="Busca una liga"
                        />
                        <Icon name="ios-search" size={18} color="white" />
                    </View>

                    {this.state.isLoading && <Loading />}
                    {!this.state.isLoading && <FlatList
                        style={{paddingTop: 18}}
                        data={this.state.leagues}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('liga', { liga: item })}>
                                    <Liga liga={{ image: item.logo, name: item.name }} />
                                </TouchableOpacity>
                            )
                        }}
                    />}
                    <TouchableOpacity style={styles.fab}>
                        <Icon name="ios-add" size={30} color='#42444D' />
                    </TouchableOpacity>
                </View>) : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42444D'
    },
    title: {
        fontSize: 26,
        color: 'white',
        marginTop: 22,
        padding: 25,
        fontFamily: 'helveticaneue'
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFDB31',
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    searchContainer: {
        position: 'absolute',
        top: 98,
        alignSelf: 'center',
        height: 50,
        backgroundColor: '#2b2d35',
        zIndex: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#F9FAFC',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    searchInput: {
        color: '#42444D',
        height: 50,
        flex: 1,
        marginRight: 30,
        color: 'white',
        fontFamily: 'helveticaneue'
    },
});