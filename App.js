import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from './src/screen/home'
import search from './src/screen/search'
import watchlist from './src/screen/watchlist'
import detail from './src/screen/detail'
import review from './src/screen/review'
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
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="USC Films" component={home} />
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
      <WatchlistStack.Screen name="WatchList" component={watchlist} />
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={({route}) => ({
          // tabBarIcon: ({focused, color, size}) => {
          //   if (route.name === 'Home') {
          //     return <AntDesign name="search" size={size} color={color} />;
          //   } else if (route.name === 'Search') {
          //     return <AntDesign name="search" size={size} color={color} />;
          //   } else if (route.name === 'WatchList') {
          //     return <AntDesign name="search" size={size} color={color} />;
          //   }
          // },
        })}
      >
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="WatchList" component={WatchlistStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


