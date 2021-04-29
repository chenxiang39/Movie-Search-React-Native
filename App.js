import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message';
import {ToastCustom} from './src/common/toastCustom'
import BottomNav from './src/navigation/bottomNav'

export default function App() {
  useEffect(async ()=>{
      await SplashScreen.hide();
  })
  const toastConfig = {
    success: ({ text1, ...rest }) => (
        <ToastCustom text = {text1} other = {rest}></ToastCustom>
    ),
  }
  return (
    <NavigationContainer>
      <BottomNav></BottomNav>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}


