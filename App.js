import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SplashScreen from 'react-native-splash-screen'
import Toast , {BaseToast} from 'react-native-toast-message';
import home from './src/screen/home'
import search from './src/screen/search'
import watchlist from './src/screen/watchlist'
import detail from './src/screen/detail'
import review from './src/screen/review'
import loading from './src/screen/loading'
import ToastCustom from './src/common/toastCustom'
const DetailStack = createStackNavigator();
function DetailStackScreen(){
  return (
    <DetailStack.Navigator>
        <DetailStack.Screen name="detail" component={detail} />
        <DetailStack.Screen name="review" component={review} />
    </DetailStack.Navigator>
  )
}
const HomeStack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="loading" 
        component={loading} 
      />
      <HomeStack.Screen name="USC Films" component={home} 
       options={{
        animationEnabled: false,
      }}
      />
      <HomeStack.Screen 
        name="Details" 
        component={DetailStackScreen} 
        options={{
          headerShown : false,
        }}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={search} />
      <HomeStack.Screen 
        name="Details" 
        component={DetailStackScreen} 
        options={{
          headerShown : false
        }}
      />
    </SearchStack.Navigator>
  );
}

const WatchlistStack = createStackNavigator();
function WatchlistStackScreen() {
  return (
    <WatchlistStack.Navigator>
      <WatchlistStack.Screen name="Watchlist" component={watchlist} />
      <HomeStack.Screen 
        name="Details" 
        component={DetailStackScreen} 
        options={{
          headerShown : false
        }}
      />
    </WatchlistStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  useEffect(async ()=>{
      await SplashScreen.hide();
  })
  const toastConfig = {
    success:({text1})=>{
      <BaseToast
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'semibold'
      }}
      text1={text1}
      text2={null}
    />
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Search') {
              return <EvilIcons name="search" size={size} color={color} />;
            } else if (route.name === 'Home') {
              return <Ionicons name="home-outline" size={size} color={color} />;
            } else if (route.name === 'WatchList') {
              return <AntDesign name="hearto" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="WatchList" component={WatchlistStackScreen} />
      </Tab.Navigator>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}


