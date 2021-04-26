import * as React from 'react';
import { useLayoutEffect,useState, useEffect,useRef} from "react";
import { View, Text, Animated, ScrollView, StyleSheet} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Topright from '../common/topright';
import Loading from '../common/loading'
import {movieDetail, tvDetail} from '../dataModel/Detail'
import {video} from '../dataModel/Video'
import {ip} from '../IpAddress.json'
export default detail = ({route, navigation}) => {
    const type = route.params.type;
    const id = route.params.id;
    const [loading, Setloading] = useState(true);
    const [detailData, SetdetailData] = useState({});
    const [videoData, SetvideoData] = useState({});
    const yoff = useRef(new Animated.Value(0)).current;
    const headerbk = yoff.interpolate({
      inputRange:[0,20,40],
      outputRange:['rgba(255,255,255,1)','rgba(255,255,255,0.8)','rgba(255,255,255,0.6)'],
      extrapolate:'clamp'
    })
    // const [topRateData, SettopRateData] = useState([]);
    useLayoutEffect(() => {
      navigation.setOptions({
        // headerRight: () => (
        //   <Topright name = "home"></Topright>
        // ),
        headerStyle :{
          backgroundColor : headerbk
        },
        headerTitleStyle : {
          opacity : 0
        }
      });
    }, [navigation]); 
    useEffect(async()=>{
      try{
        if(type === 'movie'){
          let res = await fetch(ip.node + "/gets/detail_movie?id=" + id);
          const detail_data = await res.json();
          res = await fetch(ip.node + "/gets/video_movie?id=" + id);
          const video_data = await res.json();
          SetdetailData(movieDetail(detail_data));
          SetvideoData(video(video_data));
          Setloading(false);
        }
        else{
          let res = await fetch(ip.node + "/gets/detail_tv?id=" + id);
          const detail_data = await res.json();
          res = await fetch(ip.node + "/gets/video_tv?id=" + id);
          const video_data = await res.json();
          SetdetailData(tvDetail(detail_data));
          SetvideoData(video(video_data));
          Setloading(false);
        }
      }catch(e){
        alert(e)
      }
    },[])
    if(loading){
      return (
        <Loading></Loading>
      )
    }
    else{
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
        }>
        {!videoData.key ?
          <View />:
          <YoutubePlayer
          height={200}
          videoId={videoData.key}/>
        }
        
        <Text style = {[styles.blackbold,styles.title]}>{detailData.title}</Text>
        <Text style = {[styles.info]}>{detailData.release_date} | {detailData.genres} </Text>
        <View style = {[styles.vote,styles.info]}>
          <Text style = {[styles.red]}>★  </Text>
          <Text style = {[styles.voteText]}>{detailData.vote_average}</Text>
        </View>
        <Text numberOfLines={3}>{detailData.overview}</Text>
        </Animated.ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  containerConetent:{
    paddingBottom:25
  },
  container: {
    paddingTop: 60,
    paddingLeft : '4%',
    paddingRight: '4%',
  },
  title:{
    marginTop:15,
    fontSize:28,
  },
  vote:{
    display:'flex',
    flexDirection:'row'
  },
  voteText:{
    lineHeight:20
  },
  info:{
    marginTop:13,
    fontSize:15,
    color:'rgb(12,12,12)'
  },
  red:{
    color:'red',
    fontSize:20
  },
  blackbold:{
    color:'black',
    fontWeight:'bold'
  }
});