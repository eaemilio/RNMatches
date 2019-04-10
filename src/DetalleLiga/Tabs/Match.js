import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { MapView, Marker } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import { getStadium } from '../../api-client';

export class Match extends React.Component {

    state = {
        home: "",
        away: "",
        stadiumName: "",
    }

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.getTeamsNames(this.props.match.team1, this.props.match.team2).then((teams) => {
            this.setState({
                home: teams.home,
                away: teams.away
            });
        });
        this.getStadiumName(this.props.match.stadiumId).then((stadium) => {
            this.setState({
                stadiumName: stadium
            });
        })
    }

    async getTeamsNames(team1, team2) {
        let home = await getTeam(team1).then(team => {
            return team.name
        });
        let away = await getTeam(team2).then(team => {
            return team.name
        })
        return {
            home: home,
            away: away
        }
    }

    async getStadiumName(id){
        let stadiumName = await getStadium(id).then(stadium => {
            return stadium.name;
        });
        return stadiumName;
    }

    render() {
        return (
            <View style={styles.matchBox}>
                <View style={styles.teams}>
                    <Text style={{ color: 'white' }}>{this.state.home}</Text>
                    <Text style={{ color: 'white' }}>vs</Text>
                    <Text style={{ color: 'white' }}>{this.state.away}</Text>
                </View>
                <View style={styles.matchInfo}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="ios-time" size={18} color='#8e8e8e' />
                        <Text style={{ color: '#8e8e8e', marginLeft: 10 }}>21:45</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#8e8e8e', marginRight: 10 }}>{this.state.stadiumName}</Text>
                        <Icon name="ios-pin" size={18} color='#8e8e8e' />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    matchBox: {
        width: '100%',
        height: 100,
        backgroundColor: '#393b44',
        borderRadius: 10,
        elevation: 2,
        marginBottom: 15
    },
    cardImage: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    teams: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
    matchInfo: {
        backgroundColor: '#34363d',
        height: 40,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14
    }
});
