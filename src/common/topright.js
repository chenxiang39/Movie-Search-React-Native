import * as React from 'react';
import { useState} from 'react';
import {Button, View} from 'react-native';
export default topright = (props) => {
    const [title, Settitle] = useState(true);
    if(props.name === "home"){
        return (
            <Button onPress={() => {
                Settitle(!title);
                props.SetisMovie(isMovie => !isMovie);
            }} title= {title ? "TV Shows" : "Movies"} />
        )
    }
    else{
        return (
            <View></View>
        )
    }
}