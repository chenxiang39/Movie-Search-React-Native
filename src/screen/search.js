import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Button} from 'react-native';
import { SearchBar , Icon} from 'react-native-elements';
export default  search = ({navigation, route}) => {
  const [input, Setinput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false
    });
  }, [navigation]); 
  const updateSearch = (text) =>{
    Setinput(text);
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
          value = {input} 
        />
        <View style = {styles.space}></View>
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
    space:{
      height:2000
    }
})