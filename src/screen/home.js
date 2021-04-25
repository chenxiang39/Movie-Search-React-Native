import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, Animated, StyleSheet, Button} from 'react-native';
import Topright from '../common/topright'
import {ip} from '../IpAddress.json'
export default  home = ({navigation}) => {
    const [isMovie, SetisMovie] = useState(true);
    const [loading, Setloading] = useState(true);
    const [nowPlayingData, SetnowPlayingData] = useState([])

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

    useEffect(async () =>{
      try{
        let res = await fetch(ip.node + "/gets/currently_playing");
        const data = await res.json();
        alert(data[1])
        Setloading(false);
      }catch(e){
        alert(e);
      }

    })
    if(loading){
      return (
        <View>
            <Text>loading</Text>
        </View>
      )
    }
    else{
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
            <Text style = {[styles.blackbold,styles.title]}>USC Films</Text>
        </Animated.ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '3%',
    paddingLeft : '4%',
    paddingRight: '4%',

  },
  title:{
    fontSize:26
  },
  blackbold:{
    color:'black',
    fontWeight:'bold'
  }
});