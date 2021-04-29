import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import home from '../screen/home'
import search from '../screen/search'
import watchlist from '../screen/watchlist'
import detail from '../screen/detail'
import review from '../screen/review'
import loading from '../screen/loading'
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

export const HomeStackScreen =()=> {
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
export const SearchStackScreen =()=> {
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
export const WatchlistStackScreen = () => {
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
