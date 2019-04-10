import React from 'react'
import { AsyncStorage, Animated, ImageBackground, ScrollView, TextInput, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';

import { MatchesRoute } from './Tabs/MatchesRoute';
import { TeamsRoute } from './Tabs/TeamsRoute';

import { predict } from '../api-client';

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

export class MatchScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false,
        swipeEnabled: false,
    };

    state = {
        stadium: "",
        home: "",
        away: "",
        homeCount: 0,
        awayCount: 0
    };

    componentDidMount() {
        const match = this.props.navigation.state.params.match;
        this.getTeamsData(match.team1, match.team2).then((teams) => {
            this.setState({
                home: teams.home,
                away: teams.away
            });
        });
        this.getStadiumData(match.stadiumId).then((stadium) => {
            this.setState({
                stadium: stadium
            });
        })
    }

    async getTeamsData(team1, team2) {
        let home = await getTeam(team1).then(team => {
            return team
        });
        let away = await getTeam(team2).then(team => {
            return team
        })
        return {
            home: home,
            away: away
        }
    }

    async getStadiumData(id) {
        let stadium = await getStadium(id).then(stadium => {
            return stadium;
        });
        return stadium;
    }

    handleCount(type, team) {
        if (type === 'add') {
            if (team === 'home')
                this.setState({ homeCount: this.state.homeCount + 1 });
            else this.setState({ awayCount: this.state.awayCount + 1 });
        } else {
            if (team === 'home')
                this.setState({ homeCount: this.state.homeCount - 1 });
            else this.setState({ awayCount: this.state.awayCount - 1 });
        }
    }

    async makePrediction(liga, match){
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        let winner;
        if(this.state.homeCount > this.state.awayCount)
            winner = match.team1;
        else if(this.state.homeCount < this.state.awayCount)
            winner = match.team2;
        else winner = 0;
        _.find(liga.Participants, async (p) => { 
            let response = await predict(p.id, match.id, winner, this.state.homeCount, this.state.awayCount).then(response => {
                console.log(response);
            }); 
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        const { match, liga } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        style={styles.cardImage}
                        source={{ uri: this.state.stadium.image }}
                    >
                        <TouchableOpacity onPress={() => goBack()} style={styles.back}>
                            <Icon name="ios-arrow-round-back" size={32} color='white' />
                        </TouchableOpacity>
                        <View style={[styles.layer, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
                            <View>
                                <Image
                                    style={{ width: 75, height: 75 }}
                                    source={{ uri: this.state.home.image }}
                                />
                            </View>
                            <Text style={{ color: 'white', fontStyle: 'bold', fontSize: 40 }}>{match.resultTeam1}</Text>
                            <Text style={{ color: 'white', fontStyle: 'bold', fontSize: 12 }}>vs</Text>
                            <Text style={{ color: 'white', fontStyle: 'bold', fontSize: 40 }}>{match.resultTeam2}</Text>
                            <View>
                                <Image
                                    style={{ width: 75, height: 75, resizeMode: 'cover' }}
                                    source={{ uri: this.state.away.image }}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <Text style={{ padding: 25, color: 'white' }}>Make a prediction:</Text>
                <View style={styles.content}>
                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.handleCount('add', 'home')}>
                            <Icon name="ios-arrow-up" size={50} color='white' />
                        </TouchableOpacity>

                        <Text style={{ color: 'white', fontStyle: 'bold', fontSize: 80 }}>{this.state.homeCount}</Text>
                        <TouchableOpacity onPress={() => this.handleCount('sub', 'home')}>
                            <Icon name="ios-arrow-down" size={50} color='white' />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'white', fontStyle: 'bold', fontSize: 12 }}>-</Text>
                    <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.handleCount('add', 'away')}>
                            <Icon name="ios-arrow-up" size={50} color='white' />
                        </TouchableOpacity>

                        <Text style={{ color: 'white', fontStyle: 'bold', fontSize: 80 }}>{this.state.awayCount}</Text>
                        <TouchableOpacity onPress={() => this.handleCount('sub', 'away')}>
                            <Icon name="ios-arrow-down" size={50} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity 
                        onPress={() => this.makePrediction(liga, match)}
                        style={[{ backgroundColor: '#FFDB31' }, styles.loginBtn]}
                    >
                        <View style={styles.loginBtnContent}>
                            <Text style={styles.loginBtnText}>DONE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        paddingBottom: 50,
        paddingHorizontal: 20,
        width: '100%'
    },
    loginBtn: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        elevation: 10,
    },
    loginBtnContent: {
        flexDirection: 'row'
    },
    loginBtnText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#42444D',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
});
