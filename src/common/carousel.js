import * as React from 'react';
import { View, Text } from 'react-native';
export default  carousel = (props) => {
    renderItem = ({item,index}) =>{
        return (
            <View></View>
        )
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
       </View>
    )
}