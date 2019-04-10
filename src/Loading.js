import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Animated, Easing, Text, StyleSheet } from 'react-native';

export class Loading extends React.Component {
    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount(){
        this.down();
    }

    down(){
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 400,
                easing: Easing.cubic
            }
        ).start(() => this.up());
    }

    up(){
        this.spinValue.setValue(1);
        Animated.timing(
            this.spinValue,
            {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.quad)
            }
        ).start(() => this.down());
    }

    render(){
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
        });
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Animated.View 
                    style={{transform: [{translateY: spin}]}}>
                    <Icon
                        name="ios-football" 
                        size={100} 
                        color="white"
                    />
                </Animated.View>
                <Text style={styles.loadingText}>Just wait a second...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingText: { 
        position: 'absolute', 
        bottom: 50, 
        paddingTop: 20,
        color: 'white',
        fontWeight: 'bold' 
    }
});