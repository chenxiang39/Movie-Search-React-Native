import * as React from 'react';
import {useLayoutEffect, useState, useEffect,useCallback} from 'react';
import { View, Text, StyleSheet,Dimensions,Image, ScrollView,TouchableOpacity} from 'react-native';
import watchlistLocalStorage from '../localStorage/watchlist';
import { useFocusEffect } from '@react-navigation/native';
import {ContextMenuView} from "react-native-ios-context-menu"
import Ionicons from 'react-native-vector-icons/Ionicons'
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default  watchlist = ({navigation, route}) => {
    const [loading,Setloading] = useState(false);
    const [watchlistData, SetwatchlistData] = useState([]);
    const [isLocalData, SetisLocalData] = useState([]);
    const [canClick, SetcanClick] = useState(true);
    useFocusEffect(
      useCallback(() => {
        fetchData();
        return () => {
          Setloading(false);
        };
      }, [])
    );
    useEffect(async ()=>{
      await fetchData();
      Setloading(true);
    },[loading])

    const fetchData = async () =>{
      let data = await watchlistLocalStorage.loadItem();
      await updateLocalData(data);
      SetwatchlistData(data);
    }
    const updateLocalData = async (watchlist) =>{
      let data = await watchlistLocalStorage.checkContainItemArr(watchlist);
      SetisLocalData(data);
    }
    useLayoutEffect(() => {
      navigation.setOptions({
         headerShown:false
      });
    }, [navigation]); 
    const itemClickFun = (item) =>{
        if(canClick){
            navigation.navigate('Details',{
              screen: 'detail',
              params:{
                  id:item.id,
                  type:item.type
              }
          })
        }
    }
    const contentMenuBtnFun = async (e,item,index) =>{
          if(!isLocalData[index]){
              await watchlistLocalStorage.addItemToTail(item.id,item.type,item.poster_path);
          }
          else{
              await watchlistLocalStorage.clearItem(item.id,item.type,item.poster_path);
          }
          Setloading(loading => !loading);
      }
                
    const disableClick = () =>{
        SetcanClick(false);
    }
    const enableClick = () =>{
        SetcanClick(true);
    }
    const isInIcon = Image.resolveAssetSource(Ionicons.getImageSourceSync('bookmark',60,'black'));
    const notInIcon = Image.resolveAssetSource(Ionicons.getImageSourceSync('bookmark-outline',60,'black'));
    const renderItem = () =>{
        let arr = [];
        for(let i = 0; i < watchlistData.length; i++){
           let cur = (
             <View style = {styles.itemContainer} key = {watchlistData[i].id + watchlistData[i].type}>
                  <ContextMenuView
                    lazyPreview = {false}
                    onMenuWillShow = {()=> disableClick()}
                    onMenuWillHide = {()=> enableClick()}
                    // onMenuDidShow = {()=>updatelocalData(item)}
                    onPressMenuItem={({nativeEvent})=>contentMenuBtnFun(nativeEvent,watchlistData[i],i)}
                    previewConfig={{
                        backgroundColor: 'white',
                        borderRadius:0,
                    }}
                    menuConfig={{
                        menuTitle: '',
                        menuItems: [{
                        actionKey  : 'local',
                        actionTitle: isLocalData[i]?'Remove from watchList':'Add to watchList',
                        icon: {
                            iconType : 'REQUIRE',
                            iconValue: isLocalData[i]?isInIcon:notInIcon
                        }
                        }],
                    }}
                    >
                 <TouchableOpacity onPress = {()=>itemClickFun(watchlistData[i])}>
                    <Image style ={styles.Img} source={{uri:watchlistData[i].url}}/>
                 </TouchableOpacity>
                 </ContextMenuView>
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
          {loading ? renderWatchList():(
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
    backgroundColor:'white',
  },
  foundScrollContainer:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    height:0.72 * deviceHeight
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
    height:180,
    width: (deviceWidth - 20 - 6 * 2) / 3
  },
  space:{
    width:4,
    height:180,
  }
})
