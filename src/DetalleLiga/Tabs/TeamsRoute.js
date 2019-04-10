import React from 'react';
import { Image, ScrollView, ImageBackground, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { MapView, Marker } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

import { Match } from './Match';

export class TeamsRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let teams = this.props.liga.Teams;
        return (
            <ScrollView style={styles.container}>
                {teams.map((team, i) => {
                    return(
                        <View key={i} style={styles.teamBox}>
                            <Text style={{ color: 'white' }}>{team.name}</Text>
                            <Image style={{ width: 25, height: 25 }} source={{ uri: team.image }} />
                        </View>
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
    },
    teamBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16
    }
});
