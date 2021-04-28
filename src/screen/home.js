import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, Animated, StyleSheet, Linking} from 'react-native';
import Topright from '../common/topright'
import Carousel from '../common/carousel'
import ContentMenuList from '../common/contentMenuList'
import {Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default  home = ({navigation,route}) => {
    const movtopCarouselData = route.params.movtopCarouselData;
    const movtopRateData = route.params.movtopRateData;
    const movpopularData = route.params.movpopularData;
    const tvtopCarouselData = route.params.tvtopCarouselData;
    const tvtopRateData = route.params.tvtopRateData;
    const tvpopularData = route.params.tvpopularData;

    const [isMovie, SetisMovie] = useState(true);
    const [topCarouselData, SettopCarouselData] = useState([]);
    const [topRateData, SettopRateData] = useState([]);
    const [popularData, SetpopularData] = useState([]);
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
        },
        headerBackTitleVisible:false
      });
    }, [navigation]); 




    useEffect(async () =>{
      try{
        if(isMovie){
          SettopCarouselData(movtopCarouselData);
          SettopRateData(movtopRateData);
          SetpopularData(movpopularData);
        }
        else{
          SettopCarouselData(tvtopCarouselData);
          SettopRateData(tvtopRateData);
          SetpopularData(tvpopularData);
        }
      }catch(e){
        alert(e);
      }

    },[isMovie])

    const clickBottomFun = () =>{
      const URL = 'https://www.themoviedb.org/';
        Linking.openURL(URL).catch((err) =>
          console.error('An error occurred', err),
        );
    }
      return (
        <Animated.ScrollView contentContainerStyle={styles.containerConetent} style = {styles.container}
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
            <Text style = {[styles.blackbold,styles.CarouselTitle]}>{isMovie?'Now Playing':'Trending'}</Text>
            <View style = {styles.topCarousel}>
                <Carousel data = {topCarouselData} navigation = {navigation} sliderWidth = {0.92 * deviceWidth} itemWidth = {0.92 * deviceWidth}></Carousel>
            </View>
            <Text style = {[styles.blackbold,styles.CarouselTitle]}>TopRated</Text>
            <ContentMenuList data = {topRateData} navigation = {navigation} route = {route}></ContentMenuList>
            <Text style = {[styles.blackbold,styles.CarouselTitle, styles.SecondTitle]}>Popular</Text>
            <ContentMenuList data = {popularData} navigation = {navigation} route = {route}></ContentMenuList>
            <View style = {styles.bottombtn}>
              <View style = {styles.space}></View>
              <TouchableOpacity onPress = {clickBottomFun}>
                  <Text style = {styles.bottomFont}>Powered by TMDB</Text>
              </TouchableOpacity>
              <View style = {styles.space}></View>
            </View>
            <Text style = {styles.bottomFont}>Developed by Xiang Chen</Text>
            
        </Animated.ScrollView>
      )
}

const styles = StyleSheet.create({
  containerConetent:{
    paddingBottom:25
  },
  container: {
    paddingTop: 10,
    paddingLeft : '4%',
    paddingRight: '4%',
    backgroundColor:'white'
  },
  title:{
    fontSize:30
  },
  CarouselTitle:{
    fontSize:22,
    marginTop:8,
    marginBottom:'4%'
  },
  SecondTitle:{
      marginTop:25
  },
  topCarousel:{
    height:300
  },
  bottombtn:{
    display:'flex',
    flexDirection:'row'
  },
  space:{
    flex:1,
  },
  bottomFont:{
    fontSize:12,
    color:"grey",
    alignSelf:'center',
  },
  blackbold:{
    color:'black',
    fontWeight:'bold'
  }
});