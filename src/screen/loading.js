import * as React from 'react';
import { View, Text } from 'react-native';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import {tvTopCarousel, movieTopCarousel} from '../dataModel/TopCarousel'
import {tvHorizonlist, movieHorizonlist} from '../dataModel/Horizonlist'
import Loading from '../common/loading'
import {ip} from '../IpAddress.json'
export default  loading = ({navigation,route}) => {
    const [loading, Setloading] = useState(true);
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown:false,
      });
    }, [navigation]); 
    useEffect(async()=>{
      try{
        let res = await fetch(ip.node + "/gets/currently_playing");
        const currently_playing_Data = await res.json();
        res = await fetch(ip.node + "/gets/top_rated_movies");
        const mtopListData = await res.json();
        res = await fetch(ip.node + "/gets/popular_movies");
        const mpopListData = await res.json();

        res = await fetch(ip.node + "/gets/airing_today");
        const airing_today_data = await res.json();
        res = await fetch(ip.node + "/gets/top_rated_tv");
        const tvtopListData = await res.json();
        res = await fetch(ip.node + "/gets/popular_tv");
        const tvpopListData = await res.json();
        navigation.replace('USC Films',{
            movtopCarouselData:movieTopCarousel(currently_playing_Data),
            movtopRateData:movieHorizonlist(mtopListData),
            movpopularData:movieHorizonlist(mpopListData),
            tvtopCarouselData:tvTopCarousel(airing_today_data),
            tvtopRateData:tvHorizonlist(tvtopListData),
            tvpopularData:tvHorizonlist(tvpopListData)
        });
      }catch(e){
         alert(e);
      }
    },[])
    return (
        <Loading></Loading>
    )
}