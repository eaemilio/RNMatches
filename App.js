import React from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, SwitchNavigator, createStackNavigator  } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import { getTopArtists } from './src/api-client';
import { HomeScreen } from './src/HomeScreen';
import { AuthLoadingScreen } from './src/AuthLoadingScreen';
import { LogInScreen } from './src/Login/SingInScreen';
import { EmailLogin } from './src/Login/EmailLogin';
import { ProfileScreen } from './src/ProfileScreen'
import { MatchesScreen } from './src/MatchesScreen';
import { DetalleLiga } from './src/DetalleLiga/DetalleLiga'
import { MatchScreen } from './src/DetalleLiga/MatchScreen'

const AuthStack = StackNavigator({ 
    SignIn: LogInScreen,
    EmailLogin: EmailLogin
});

const HomeStack = StackNavigator({
  Home: HomeScreen,
  liga: DetalleLiga,
  MatchScreen: MatchScreen
});

const RootStack = TabNavigator(
  {
    Home: { screen: HomeStack },
    Matches: { screen: MatchesScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconSize = focused ? 25 : 18;
        if (routeName === 'Home') {
          iconName = `ios-navigate${focused ? '' : '-outline'}`;
        } else if (routeName === 'Matches') {
          iconName = `ios-flag${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Live') {
          iconName = `ios-play${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={iconSize} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FFDB31',
      inactiveTintColor: 'white',
      style:{
        backgroundColor: '#42444D',
        height: 60,
        paddingBottom: 5,
        paddingTop: 5
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
