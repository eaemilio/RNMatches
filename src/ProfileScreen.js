import React from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, SwitchNavigator } from 'react-navigation';

export class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Perfil',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#42444D' }}>
        <Button title="I'm done, sign me out" onPress={this.signOutAsync} />
      </View>
    );
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
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
  },
});