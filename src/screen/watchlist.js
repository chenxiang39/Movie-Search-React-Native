import * as React from 'react';
import {useLayoutEffect, useState, useEffect,useCallback} from 'react';
import { View, Text, StyleSheet,Dimensions,Image, ScrollView,TouchableOpacity} from 'react-native';
import watchlistLocalStorage from '../localStorage/watchlist';
import {AutoDragSortableView} from 'react-native-drag-sort'
import { useFocusEffect } from '@react-navigation/native';
import {ContextMenuView} from "react-native-ios-context-menu"
import Ionicons from 'react-native-vector-icons/Ionicons'
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
const childrenWidth = (deviceWidth - 20 - 6 * 2) / 3
const childrenHeight = 180
const margin = 4;
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
    const itemClickFun = (data,item,index) =>{
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

    const renderItem =(item,i) =>{
        return (
            <View style = {styles.itemContainer}>
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
                  <Image style ={styles.Img} source={{uri:watchlistData[i].url}}/>
                </ContextMenuView>
             </View>
        )
    }
    const dataChangeFun = async (data) =>{
        await watchlistLocalStorage.saveNewArr(data);
        await fetchData();
        Setloading(true);
    }
    const renderWatchList = () =>{
       if(watchlistData.length !== 0){
          return (
            <View style = {styles.foundContainer}>
                <Text style = {styles.title}>Watchlist</Text>
                <AutoDragSortableView
                    dataSource = {watchlistData}
                    childrenHeight = {childrenHeight}
                    childrenWidth = {childrenWidth}
                    marginChildrenBottom={margin}
                    marginChildrenRight={margin}
                    marginChildrenLeft = {margin}
                    marginChildrenTop = {margin}
                    maxScale={1}
                    onDataChange={dataChangeFun}
                    keyExtractor={(item,index)=> item.id + item.type}
                    renderItem={renderItem}
                    onClickItem={itemClickFun}
                />
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
      flex:1,
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
      flexDirection:'column',
      flex:1
  },
  title:{
    fontSize:30,
    color: 'black',
    fontWeight:'bold'
  },
  Img:{
    height:childrenHeight,
    width: childrenWidth
  },
})