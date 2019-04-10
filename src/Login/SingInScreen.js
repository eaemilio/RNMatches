import React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, TouchableHighlight, Image, StatusBar, TextInput } from 'react-native';
import { Facebook } from 'expo';

import Icon from 'react-native-vector-icons/Ionicons';

export class LogInScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = { pressStatus: false };
    }

    static navigationOptions = {
        title: 'Please sign in',
        header: null
    };

    onHideUnderlay(){
        this.setState({ pressStatus: false });
    }

    onShowUnderlay(){
        this.setState({ pressStatus: true });
    }

    facebookLogIn = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('192597478015858', {
          permissions: ['public_profile'],
        });
      
        if (type === 'success') {
            await AsyncStorage.setItem('userToken', token);
            this.props.navigation.navigate('App');  
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        
            console.log(
                'Logged in!',
                `Hi ${(await response.json()).name}!`,
            );
        }
    }

    googleLogIn = async () => {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId: '881200844979-604gll51d5dq4geial8onfsi5npln9gt.apps.googleusercontent.com',
            iosClientId: '881200844979-ptjuku7r4asqredsm63r21v7mgnvmet6.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
  
          if (result.type === 'success') {
            await AsyncStorage.setItem('userToken', result.accessToken);
            this.props.navigation.navigate('App');
          } else {
            return {cancelled: true};
          }
        } catch(e) {
          return {error: true};
        }
    }

    logIn = async() => {
        this.props.navigation.navigate('EmailLogin');
    }
    
    render() {
        return (
            <View style={styles.AppContainer}>
                <StatusBar barStyle = "light-content" hidden = {false}/>
                <Image
                    style={{
                        backgroundColor: '#ccc',
                        flex: 1,
                        position: 'absolute',
                        resizeMode: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    source={require('../../assets/img/bg-soccer.jpg')}
                ></Image>
                <View style={styles.container}>
                    <TouchableHighlight
                        activeOpacity={1}
                        style={ [{backgroundColor: '#FFDB31'}, styles.loginBtn] }
                        onPress={this.logIn}
                    >
                        <View style={styles.loginBtnContent}>
                            <Icon name="ios-mail" size={20} color="white" style={{marginRight: 15}}/>
                            <Text style={styles.loginBtnText}>Login with Email</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={{marginVertical: 15, color: 'white'}}>Or</Text>
                    <TouchableHighlight
                        activeOpacity={1}
                        style={ [styles.facebookBtn, styles.loginBtn] }
                        underlayColor="#5B7BD5"
                        onPress={this.facebookLogIn}
                    >
                        <View style={styles.loginBtnContent}>
                            <Icon name="logo-facebook" size={16} color="white" style={{marginRight: 15}}/>
                            <Text style={styles.loginBtnText}>Login with Facebook</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={1}
                        style={ [styles.googleBtn, styles.loginBtn] }
                        underlayColor="#E74B37"
                        onPress={this.googleLogIn}
                    >
                        <View style={styles.loginBtnContent}>
                            <Icon name="logo-google" size={16} color="white" style={{marginRight: 15}}/>
                            <Text style={styles.loginBtnText}>Login with Google</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.bottomButtons}>
                        <TouchableHighlight style={{flex: 1, margin: 10}}>
                            <Text style={{color: 'white', textAlign: 'left', fontWeight: 'bold'}}>Create Account</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{flex: 1, margin: 10}}>
                            <Text style={{color: 'white', textAlign: 'right', fontWeight: 'bold'}}>Forgot Password?</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingTop: 100
    },
    facebookBtn: {
        backgroundColor: '#4C69BA',
        marginBottom: 15
    },
    loginBtnContent: {
        flexDirection: 'row'
    },
    loginBtnText: {
        color: 'white',
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    googleBtn: {
        backgroundColor: '#DD4B39',
    },
    logoContainer: {
        marginBottom: 100
    },
    bottomButtons: {
        marginTop: 25,
        flexDirection: 'row'
    },
    loginContainer: {
        alignSelf: "stretch",
        marginBottom: 75,
    },
    loginInputBox: {
        alignSelf: "stretch",
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    loginBtn: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        elevation: 10
    },
    loginInput: {
        alignSelf: "stretch",
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    emailInput: {
        borderBottomWidth: 0,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    }
});