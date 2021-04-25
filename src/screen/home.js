import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, Animated, StyleSheet, Button} from 'react-native';
import Topright from '../common/topright'
import {tvTopCarousel, movieTopCarousel} from '../dataModel/TopCarousel'
import Carousel from '../common/carousel'
import {ip} from '../IpAddress.json'
import {Dimensions} from 'react-native';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default  home = ({navigation}) => {
    const [isMovie, SetisMovie] = useState(true);
    const [loading, Setloading] = useState(true);
    const [topCarouselData, SettopCarouselData] = useState([]);

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
        if(isMovie){
          let res = await fetch(ip.node + "/gets/currently_playing");
          const data = await res.json();
          SettopCarouselData(movieTopCarousel(data));
          Setloading(false);
        }
        else{

        }
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
            <Text style = {[styles.blackbold,styles.topCarouselTitle]}>{isMovie?'Now Playing':'Trending'}</Text>
            <Carousel data = {topCarouselData} sliderWidth = {0.92 * deviceWidth} itemWidth = {0.92 * deviceWidth}></Carousel>
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
    fontSize:30
  },
  topCarouselTitle:{
    fontSize:22,
    marginTop:'3%',
    marginBottom:'4%'
  },
  blackbold:{
    color:'black',
    fontWeight:'bold'
  }
});