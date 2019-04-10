import React from 'react'
import { AsyncStorage, Animated, ImageBackground, ScrollView, TextInput, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

import { MatchesRoute } from './Tabs/MatchesRoute';
import { TeamsRoute } from './Tabs/TeamsRoute';

import { isParticipantOf, joinLeague } from '../api-client'


let liga, navigation;

const matchesRoute = () => (
    <MatchesRoute liga={liga} navigation={navigation} />
);
const teamsRoute = () => (
    <TeamsRoute liga={liga}/>
);
const participantsRoute = () => (
    <View style={[styles.container]} />
);

export class DetalleLiga extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        swipeEnabled: false,
    };

    state = {
        index: 0,
        routes: [
            { key: 'partidos', title: 'Partidos' },
            { key: 'equipos', title: 'Equipos' },
            { key: 'participantes', title: 'Participantes' },
        ],
        participant: false
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? '#FFDB31' : 'white')
                        ),
                    });
                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = SceneMap({
        partidos: matchesRoute,
        equipos: teamsRoute,
        participantes: participantsRoute,
    });

    async componentDidMount(){
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        this.setState({
            user: user
        });
        _.find(liga.Participants, (p) => { 
            this.setState({
                participant: p.userId === user.id && p.leagueId === liga.id
            });
        });
    }

    async join(liga){
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        let response = await joinLeague(user, liga).then(response => {
            console.log(response);
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        liga = this.props.navigation.state.params.liga;
        navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {!this.state.participant && <View style={styles.joinView}>
                        <TouchableOpacity style={styles.joinBtn} onPress={() => this.join(liga)}>
                            <View></View>
                            <Text style={styles.joinBtnText}>UNIRME</Text>
                            <Icon name="ios-arrow-round-forward" size={20} color="#42444D" />
                        </TouchableOpacity>
                    </View>}
                    <ImageBackground
                        style={styles.cardImage}
                        source={{ uri: liga.logo }}
                    >
                        <TouchableOpacity onPress={() => goBack()} style={styles.back}>
                            <Icon name="ios-arrow-round-back" size={32} color='white' />
                        </TouchableOpacity>
                        <View style={[styles.layer, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
                            <Text style={styles.cardText}>
                                {liga.name}
                            </Text>
                            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="ios-person" size={18} color='white' />
                                <Text style={{ color: 'white', marginLeft: 10 }}>12,548</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    style={{ width: '100%', paddingTop: 40 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42444D',
        alignItems: 'center'
    },
    back: {
        position: 'absolute',
        zIndex: 100,
        marginTop: 28,
        marginLeft: 18
    },
    header: {
        width: '100%',
        height: 250,
        overflow: 'visible'
    },
    title: {
        fontSize: 26,
        marginTop: 22,
        color: 'white',
        padding: 25,
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    cardImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    layer: {
        paddingTop: 25,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    joinView: {
        position: 'absolute',
        bottom: -25,
        zIndex: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joinBtn: {
        backgroundColor: '#FFDB31',
        borderRadius: 30,
        height: 50,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 10
    },
    joinBtnText: {
        color: '#42444D',
        fontWeight: 'bold'
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});
