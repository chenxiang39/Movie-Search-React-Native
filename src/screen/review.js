import * as React from 'react';
import { useLayoutEffect,useRef} from "react";
import { View, Text, Animated,ScrollView,StyleSheet} from 'react-native';
export default  review = ({navigation,route}) => {
    const title = route.params.title;
    const author = route.params.author;
    const created_at = route.params.created_at;
    const rating = route.params.rating;
    const content = route.params.content;

    const yoff = useRef(new Animated.Value(0)).current;
    const headerbk = yoff.interpolate({
      inputRange:[0,20,40],
      outputRange:['rgba(255,255,255,1)','rgba(255,255,255,0.8)','rgba(255,255,255,0.6)'],
      extrapolate:'clamp'
    })
    useLayoutEffect(() => {
      navigation.setOptions({
        // headerRight: () => (
        //   <Topright name = "home"></Topright>
        // ),
        headerTitleStyle : {
          opacity : 0
        },
        headerStyle :{
          backgroundColor : headerbk
        },
      });
    }, [navigation]); 

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
          <Text style = {styles.title}>{title}</Text>
          <Text style = {styles.des}>By {author} on {created_at}</Text>
          <View style = {[styles.info]}>
              <Text style = {[styles.red]}>★  </Text>
              <Text style = {[styles.rat]}>{rating}</Text>
          </View>
          <View style = {styles.line}></View>
          <Text style = {styles.content}>{content}</Text>
      </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
  containerConetent:{
    paddingBottom:80
  },
  container: {
    paddingTop: 60,
    paddingLeft : '4%',
    paddingRight: '4%',
    backgroundColor:'white'
  },
  title:{
    marginTop:15,
    fontSize:28,
    color:'black',
    fontWeight:'bold'
  },
  des:{
    marginTop:8,
    fontSize:16,
    color:'rgb(143,143,143)'
  },
  info:{
      display:'flex',
      flexDirection:'row',
      marginTop:10,
  },
  rat:{
      lineHeight:25,
      fontSize:16,
  },
  red:{
      color:'red',
      fontSize:20
  },
  line:{
    marginTop:10,
    height:1,
    backgroundColor:'rgba(163,163,163,0.2)'
  },
  content:{
      marginTop:10,
      fontSize:14,
      color:'black'
  }
});