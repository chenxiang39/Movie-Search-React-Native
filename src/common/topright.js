import * as React from 'react';
import { useState} from 'react';
import {Button, View, StyleSheet, Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    else if(props.name === "detail"){
        const clickLocal = () =>{
            alert(props.title);
        }
        const clickFacebook = () =>{
            let fblink = 'https://www.themoviedb.org/' + props.type + '/' + props.id; 
            let facebooklink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(fblink)
            Linking.openURL(facebooklink).catch((err) =>
                console.error('An error occurred', err),
            );
        }
        const clickTwitter = () =>{
            let twlink = 'Check out this link:\nhttps://www.themoviedb.org/' + props.type + '/' + props.id + ' #CSCI571USCFilms'; 
            let twitterlink = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twlink)
            Linking.openURL(twitterlink).catch((err) =>
                console.error('An error occurred', err),
            );
        }
        
        return (
            <View style = {styles.btncontainer}>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress = {()=> clickLocal()}>
                    <Ionicons name = "bookmark-outline" size={25} color = "black"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress = {()=> clickFacebook()}>
                    <FontAwesome name = "facebook-f" size={25} color = "black"></FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress = {()=> clickTwitter()}>
                    <Entypo name = "twitter" size={25} color = "black"></Entypo>
                </TouchableOpacity>
            </View>
        )
    }
    else {
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    btncontainer:{
        display:'flex',
        flexDirection:'row',
    },
    btn:{
        marginRight:14
    }
})