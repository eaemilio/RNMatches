import React from 'react';
import { Alert, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { MapView, Marker } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import { Match } from './Match';
import { getTeam, getStadium } from '../../api-client';

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

let liga;

export class MatchesRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        participant: false
    }

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

    handleNavigate(navigation, match){
        if(this.state.participant)
            navigation.navigate('MatchScreen', { match: match, liga: liga});
        else{
            Alert.alert(
                'Únete a la liga',
                'Para poder realizar un pronóstico, únete a la liga',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false }
            );
        }
    }

    render() {
        liga = this.props.liga;
        let matches = this.props.liga.Matches, {navigation} = this.props;
        return (
            <ScrollView style={styles.container}>
                {matches.map((match, i) => {
                    return (
                        <TouchableOpacity onPress={() => this.handleNavigate(navigation, match)}>
                            <Match key={i} match={match} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42444D',
        padding: 16
    }
});
