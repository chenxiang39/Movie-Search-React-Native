import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text,StyleSheet} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
export default toastCustom = (props) => {
    alert("custom")
    return (
        <BaseToast
        style={{ borderLeftColor: 'pink',backgroundColor:'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: 'semibold'
        }}
        text1={text1}
      />
    )
}

const styles = StyleSheet.create({
    container:{
        width:120,
        height:60,
        backgroundColor:'rgb(142,142,146)',
        color:'white'
    },
}); 