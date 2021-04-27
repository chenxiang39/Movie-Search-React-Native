import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Button} from 'react-native';
import { SearchBar , Icon} from 'react-native-elements';
import Verticallist from '../common/verticallist';
import {searchDataModel} from '../dataModel/Search';
import {ip} from '../IpAddress.json'
import {Dimensions} from 'react-native';
global.deviceHeight = Dimensions.get('window').height
export default  search = ({navigation, route}) => {
  const delayTime = 1000;
  const [input, Setinput] = useState("");
  const [searchData, SetsearchData] = useState([]);
  const [activeSearch, SetactiveSearch] = useState(false);
  const timer = useRef();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false
    });
  }, [navigation]); 
  useEffect(()=>{
    timer.current = setTimeout(async ()=>{
      if(input.length >= 3){
        try{
          let res = await fetch(ip.node + "/gets/multi_search?query=" + input);
          const Search_Data = await res.json();
          SetsearchData(searchDataModel(Search_Data));
          SetactiveSearch(true);
        }catch(e){
          alert(e);
        }
      }
    },delayTime)
    return () => clearTimeout(timer.current)
  },[input])

  const updateSearch = (text) =>{
    Setinput(text);
  }
  const cancelFun = () =>{
    SetactiveSearch(false);
  }
  renderSearch = () =>{
      if(activeSearch){
         if(searchData.length === 0){
           return (             
              <Text style = {styles.notFound}>No Results</Text>
           )
         }
         else{
           return (
             <Verticallist data ={searchData} name = "search" navigation = {navigation}></Verticallist>
           )
         }
      }
  }
  return (
    <View style = {styles.container}>
        <Text style = {styles.title}>Search</Text>
        <SearchBar
          containerStyle = {styles.searchContainer}
          inputContainerStyle = {styles.inputContainer}
          platform={Platform.OS}
          placeholder='Search Movies, TVs...' 
          onChangeText = {updateSearch} 
          onCancel = {cancelFun}
          value = {input} 
        />
        <View style = {styles.space}>
            {renderSearch()}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      paddingLeft:5,
      paddingRight:5,
      paddingTop:100,
      backgroundColor:'rgba(255,255,255,1)'
    },
    title:{
      fontWeight:'bold',
      color:'black',
      fontSize:33,
      paddingLeft:10
    },
    searchContainer:{
      height:35,
      marginTop:20
    },
    inputContainer:{
      height:35,
      borderRadius:10,
      backgroundColor:'rgb(235,235,235)'
    },
    notFound:{
      marginTop:20,
      textAlign:'center',
      fontSize:25,
      color:'rgb(143,143,143)'
    },
    space:{
      marginTop:15,
      height:0.66 * deviceHeight
    },
})