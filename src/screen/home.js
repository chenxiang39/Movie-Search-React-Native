import * as React from 'react';
import { useRef,useLayoutEffect, useState} from 'react';
import { View, Text, Animated, StyleSheet, Button} from 'react-native';
import Topright from '../common/topright'
export default  home = ({navigation}) => {
  const [isMovie, SetisMovie] = useState(true);
  const yoff = useRef(new Animated.Value(0)).current;
  const headerbk = yoff.interpolate({
    inputRange:[0,20,40],
    outputRange:['rgba(255,255,255,1)','rgba(255,255,255,0.8)','rgba(255,255,255,0.6)'],
    extrapolate:'clamp'
  })
  const titleOp = yoff.interpolate({
    inputRange:[0,40],
    outputRange:[0,1],
    extrapolate:'clamp'
  })
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Topright name = "home" SetisMovie = {SetisMovie}></Topright>
      ),
      headerStyle :{
        backgroundColor : headerbk
      },
      headerTitleStyle : {
        opacity : titleOp
      }
    });
  }, [navigation]);
    return (
        <Animated.ScrollView style = {styles.container}
          scrollEventThrottle = {16}
          automaticallyAdjustContentInsets
          onScroll = {
            Animated.event([
              {
                nativeEvent:{
                  contentOffset: {y:yoff}
                }
              }
            ],{
              useNativeDriver:false
            })
          }
        >
            <Text>{isMovie ? 'Movie' : 'TV shows'}</Text>
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '3%'
  },
});