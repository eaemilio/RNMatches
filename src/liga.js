import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export class Liga extends React.Component {
  render() {

    const {image, name} = this.props.liga;

    return (
        <View style={styles.leagueBox}>
            <View style={styles.leagueInfo}>
              <ImageBackground
              style={styles.cardImage}
              source={{ uri: image}}
              > 
                <View style={[styles.layer, {backgroundColor: "rgba(0,0,0,0.5)"}]}>
                    <Text style={styles.cardText}>
                        {name}
                    </Text>
                </View>
              </ImageBackground>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  leagueBox: {
    backgroundColor: '#373942',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 150,
  },
  leagueInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leagueName: {
      fontSize: 20
  },
  layer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});
