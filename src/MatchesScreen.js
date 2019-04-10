import React from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { MapView, Marker } from 'expo';

export class MatchesScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      coords: [],
      isLoading: true,
    }
  }

  static navigationOptions = {
    title: 'Partidos',
  };

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Partidos</Text>

      </View>
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
    fontWeight: 'bold'
  }
});
