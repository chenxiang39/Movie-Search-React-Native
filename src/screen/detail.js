import * as React from 'react';
import { View, Text } from 'react-native';
export default  home = ({route, navigation}) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{route.params.id}</Text>
        <Text>{route.params.type}</Text>
      </View>
    )
}