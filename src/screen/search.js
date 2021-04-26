import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
export default  search = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false
    });
  }, [navigation]); 
  return (
    <View style = {styles.container}>
        <Text style = {styles.title}>Search</Text>
        <View style = {styles.searchContainer}>
            <View style = {styles.inputContainer}></View>
        </View>
        <View style = {styles.space}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      paddingLeft:5,
      paddingRight:5,
      paddingTop:120,
      backgroundColor:'rgba(255,255,255,1)'
    },
    title:{
      fontWeight:'bold',
      color:'black',
      fontSize:33,
      paddingLeft:10
    },
    searchContainer:{
      marginTop:20,
      height:35,

    },
    inputContainer:{
       backgroundColor:'rgb(235,235,235)',
       width:'100%',
       height:'100%',
       borderRadius:10
    },
    space:{
      height:2000
    }
})