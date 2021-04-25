import * as React from 'react';
import { useRef,useLayoutEffect, useState} from 'react';
import { View, Text, Animated, StyleSheet, Button} from 'react-native';
import Topright from '../common/topright'
export default  home = ({navigation}) => {
  const [isMovie, SetisMovie] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Topright name = "home" SetisMovie = {SetisMovie}></Topright>
      ),
    });
  }, [navigation]);
    return (
        <Animated.ScrollView style = {styles.container}>
            <Text>{isMovie ? 'Movie' : 'TV shows'}</Text>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '3%'
  },
});