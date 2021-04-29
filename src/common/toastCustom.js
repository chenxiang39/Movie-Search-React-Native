import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text,StyleSheet} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
export const ToastCustom = (props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{props.text}</Text>
     </View>
    )
}
export const ToastCustomShow = (notice) =>{
   return{
      type: 'success',
      position: 'bottom',
      text1: notice,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 95,
  };
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        padding:10,
        width:300,
        borderRadius:60,
        backgroundColor:'rgb(142,142,146)',
    },
    container2:{
      display:'flex',
      padding:0,
      width:300,
      borderRadius:60,
      backgroundColor:'rgb(142,142,146)',
    },
    rightContainer:{
      backgroundColor:'yellow',
      display:'none'
    },
    text:{
      fontSize: 15,
      color:'white',
      textAlign:'center'
    }
}); 