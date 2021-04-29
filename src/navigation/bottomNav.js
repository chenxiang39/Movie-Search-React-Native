import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {HomeStackScreen,SearchStackScreen,WatchlistStackScreen} from './stackNav'

const Tab = createBottomTabNavigator();

export default BottomNav = () =>{
    return (
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
    )
}