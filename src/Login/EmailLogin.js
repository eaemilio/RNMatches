import React from 'react';
import { Alert, Text, View, StyleSheet, Button, AsyncStorage, TouchableHighlight, Image, StatusBar, TextInput } from 'react-native';
import { Facebook } from 'expo';

import Icon from 'react-native-vector-icons/Ionicons';

import { login } from '../api-client';
import { Loading } from '../Loading'

export class EmailLogin extends React.Component {

    state = {
        email: "",
        password: "",
        isLoading: false
    }

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Please sign in',
        header: null
    };

    logIn = async () => {
        this.setState({ isLoading: true });
        login(this.state.email, this.state.password).then(async response => {
            if (response.length > 0) {
                delete response[0].password;
                await AsyncStorage.setItem('user', JSON.stringify(response[0]));
                this.props.navigation.navigate('App');
            }
            else {
                Alert.alert(
                    'email/password incorrect',
                    'Try using an existent email and a valid password',
                    [
                        { text: 'Ok' },
                    ],
                    { cancelable: false }
                );
            }
            this.setState({ isLoading: false });
        });
    }

    render() {
        return (
            <View style={styles.AppContainer}>
                <StatusBar barStyle="light-content" hidden={false} />
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
                {this.state.isLoading && <Loading />}
                {!this.state.isLoading &&
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.emailInput, styles.loginInput]}
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                            placeholder="Email"
                        />
                        <TextInput
                            style={[styles.passwordInput, styles.loginInput]}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            placeholder="Password"
                        />
                        <TouchableHighlight
                            activeOpacity={1}
                            style={[{ backgroundColor: '#FFDB31' }, styles.loginBtn]}
                            onPress={this.logIn}
                        >
                            <View style={styles.loginBtnContent}>
                                <Text style={styles.loginBtnText}>Login</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.bottomButtons}>
                            <TouchableHighlight style={{ flex: 1, margin: 10 }}>
                                <Text style={{ color: 'white', textAlign: 'left', fontWeight: 'bold' }}>Create Account</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={{ flex: 1, margin: 10 }}>
                                <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold' }}>Forgot Password?</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                }
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
    loginBtnContent: {
        flexDirection: 'row'
    },
    loginBtnText: {
        color: 'white',
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
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
        borderBottomWidth: 0,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        alignSelf: "stretch",
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: 'white',
        marginHorizontal: 14
    },
    emailInput: {
        marginBottom: 20,
    },
    passwordInput: {
        marginBottom: 50,
    }
});