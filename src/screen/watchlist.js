import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, StyleSheet,Dimensions,Image} from 'react-native';
import watchlistLocalStorage from '../localStorage/watchlist';
import watchlistDataModel from '../dataModel/Watchlist'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default  watchlist = ({navigation, route}) => {
    const [init,Setinit] = useState(false);
    const [watchlistData, SetwatchlistData] = useState([]);
    useEffect(async ()=>{
      let data = await watchlistLocalStorage.loadItem();
      SetwatchlistData(data);
      Setinit(true);
    },[watchlistData])
    useLayoutEffect(() => {
      navigation.setOptions({
         headerShown:false
      });
    }, [navigation]); 
    const itemClickFun = (item) =>{
        navigation.navigate('Details',{
            screen: 'detail',
            params:{
                id:item.id,
                type:item.type
            }
        })
    }
    const renderItem = () =>{
        let arr = [];
        for(let i = 0; i < 6; i++){
           let cur = (
             <View style = {styles.itemContainer} key = {watchlistData[0].id + watchlistData[0].type + i}>
                 <TouchableOpacity onPress = {()=>itemClickFun(watchlistData[0])}>
                    <Image style ={styles.Img} source={{uri:watchlistData[0].url}}/>
                 </TouchableOpacity>
                 <View style={styles.space}></View>
             </View>
            
           )
           arr.push(cur);
        }
        return arr;
    }
    const renderWatchList = () =>{
       if(watchlistData.length !== 0){
          return (
            <View style = {styles.foundContainer}>
                <Text style = {styles.title}>Watchlist</Text>
                <ScrollView>
                    <View style = {styles.foundScrollContainer}>
                      {renderItem()}
                    </View>
                </ScrollView>
            </View>
          )
       }
       else{
         return (
            <View style={styles.notFoundcontainer}>
                <Text style = {styles.notFound}>Watchlist is empty</Text>
            </View>
         )
       }
    }
    return (
      <View style={styles.container}>
          {init ? renderWatchList():(
            <View></View>
          )}
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:120,
    backgroundColor:'white'
  },
  foundScrollContainer:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  itemContainer:{
    display:'flex',
    flexDirection:'row',
    marginTop:4
  },
  notFoundcontainer:{
    display:'flex',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  notFound:{
    textAlign:'center',
    fontSize:24,
    color:'rgb(130,130,130)'
  },
  foundContainer:{
      display:'flex',
      flexDirection:'column'
  },
  title:{
    fontSize:30,
    color: 'black',
    fontWeight:'bold'
  },
  Img:{
    height:200,
    width: (deviceWidth - 20 - 6 * 2) / 3
  },
  space:{
    width:4,
    height:200,
  }
})
