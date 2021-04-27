// import * as React from 'react';
// import { View, Text } from 'react-native';
// export default  home = () => {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     )
// }


import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, NativeModules } from 'react-native';

export default class App extends Component {

  /**
   * 测试
   * @memberof App
   */
  testImage = () => {
    const myImage = require('../img/twitter.png');
    const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    const resolvedImage = Image.resolveAssetSource(myImage);
    alert(resolvedImage);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.testImage}>Test</Text>
        <Image source={require('../img/twitter.png')} style={styles.icon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 150,
    height: 150,
  },

  text: {
    marginBottom: 20,
    fontSize: 20,
  }
});