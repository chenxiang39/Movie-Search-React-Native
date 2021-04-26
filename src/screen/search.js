import * as React from 'react';
import { useRef,useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
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
            <View style = {styles.icon}></View>
            <TextInput
                style = {styles.input}
                clearButtonMode = 'while-editing'
            />
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
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      marginTop:20,
      height:35,
      backgroundColor:'rgb(238,238,238)',
      borderRadius:10
    },
    icon:{
      width:30,
      height:30
    },
    input:{
      height:30,
      flex:1
    },
    space:{
      height:2000
    }
})