import * as React from 'react';
import { useState} from 'react';
import {Button, View, Text,StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
export default loading = () => {
    return (
        <Spinner
            color='rgb(143,143,143)'
            overlayColor='rgb(255,255,255,0.25)'
            size = "small"
            visible={true}
            textContent={'Fetching Data...'}
            textStyle={styles.spinnerTextStyle}
      />
    )
}

const styles = StyleSheet.create({
    containerConetent:{
      paddingBottom:25
    },
    spinnerTextStyle:{
        top:50,
        fontSize:14,
        color:'rgb(163,163,163)'
    }
})