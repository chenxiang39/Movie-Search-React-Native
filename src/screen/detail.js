import * as React from 'react';
import { useLayoutEffect,useState, useEffect,useRef} from "react";
import { View, Text, Animated, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Topright from '../common/topright';
import Loading from '../common/loading';
import Horizonlist from '../common/horizonlist'
import Verticallist from '../common/verticallist'
import {video} from '../dataModel/Video'
import {movieDetail, tvDetail} from '../dataModel/Detail'
import {cast} from '../dataModel/Cast'
import {review} from '../dataModel/Review'
import {ip} from '../IpAddress.json'
export default detail = ({route, navigation}) => {
    const type = route.params.type;
    const id = route.params.id;
    const [loading, Setloading] = useState(true);
    const [detailData, SetdetailData] = useState({});
    const [videoData, SetvideoData] = useState({});
    const [showMore, SetshowMore] = useState(true);
    const [castData, SetcastData] = useState([]);
    const [reviewData, SetreviewData] = useState([]);
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
          res = await fetch(ip.node + "/gets/cast_movie?id=" + id);
          const cast_data = await res.json();
          res = await fetch(ip.node + "/gets/review_movie?id=" + id);
          const review_data = await res.json();
          SetdetailData(movieDetail(detail_data));
          SetvideoData(video(video_data));
          SetcastData(cast(cast_data));
          SetreviewData(review(review_data));
          Setloading(false);
        }
        else{
          let res = await fetch(ip.node + "/gets/detail_tv?id=" + id);
          const detail_data = await res.json();
          res = await fetch(ip.node + "/gets/video_tv?id=" + id);
          const video_data = await res.json();
          res = await fetch(ip.node + "/gets/cast_tv?id=" + id);
          const cast_data = await res.json();
          res = await fetch(ip.node + "/gets/review_tv?id=" + id);
          const review_data = await res.json();
          SetdetailData(tvDetail(detail_data));
          SetvideoData(video(video_data));
          SetcastData(cast(cast_data));
          SetreviewData(review(review_data));
          Setloading(false);
        }
      }catch(e){
        alert(e)
      }
    },[])
    renderShowMore = () =>{
      if(!!detailData.overview){
        return (
          <View style = {styles.overview}>
            {
               showMore ? <Text numberOfLines = {3}>{detailData.overview}</Text> : <Text>{detailData.overview}</Text>
            }
            <View style = {styles.showMoreBtn}>
              <View style = {styles.space}></View>
              <TouchableOpacity onPress = {showMoreFun}>
                  <Text style = {styles.btnFont}>{showMore?'Show more..':'Show less'}</Text>
              </TouchableOpacity>
              </View>
          </View>
        )
      }
    }
    renderCast = () =>{
      if(castData.length !== 0){
        return (
           <View>
              <Text style = {[styles.blackbold, styles.secondTitle]}> Cast & Crew </Text>
              <Horizonlist name = "cast" data = {castData}></Horizonlist>
           </View>
        )
      }
    }
    renderReview = () =>{
       if(reviewData.length !== 0){
         return (
            <View>
                <Text style = {[styles.blackbold, styles.thirdTitle]}> Reviews </Text>
                <Verticallist name = "review" data = {reviewData} navigation = {navigation}></Verticallist>
            </View>
         )
       }
    }
    showMoreFun = () =>{
       SetshowMore( cur => !cur);
    }
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
        {renderShowMore()}
        {renderCast()}
        {renderReview()}
      </Animated.ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  containerConetent:{
    paddingBottom:80
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
  space:{
    flex:1
  },
  overview:{
    marginTop:10
  },
  showMoreBtn:{
    marginTop:15,
    display:'flex',
    flexDirection:'row'
  },
  btnFont:{
    color:'rgb(100,100,100)'
  },
  secondTitle:{
      marginTop:15,
      marginBottom:20,
      fontSize:22
  },
  thirdTitle:{
    marginTop:5,
    marginBottom:20,
    fontSize:22
  },
  blackbold:{
    color:'black',
    fontWeight:'bold'
  }
});