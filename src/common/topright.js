import * as React from 'react';
import { useState,useEffect} from 'react';
import {Button, View, StyleSheet, Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {watchlistDataModel} from '../dataModel/Watchlist'
import watchlistLocalStorage from '../localStorage/watchlist'
export default topright = (props) => {
    if(props.name === "home"){
        const [title, Settitle] = useState(true);
        return (
            <Button onPress={() => {
                Settitle(!title);
                props.SetisMovie(isMovie => !isMovie);
            }} title= {title ? "TV Shows" : "Movies"} />
        )
    }
    else if(props.name === "detail"){
        const [isLocal, SetisLocal] = useState(false);
        useEffect(async ()=>{
            let data = await watchlistLocalStorage.checkContainItem(props.id,props.type,props.poster_path);
            SetisLocal(data);
        },[isLocal])
        const clickLocal = async () =>{
            if(isLocal){
                await watchlistLocalStorage.clearItem(props.id,props.type,props.poster_path);
                SetisLocal(false);
            }
            else{
                await watchlistLocalStorage.addItemToTail(props.id,props.type,props.poster_path);
                SetisLocal(true);
            }
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
        let localIcon = isLocal ? 'bookmark':'bookmark-outline';
        let localColor = isLocal ? 'rgb(48,123,246)':'black';
        return (
            <View style = {styles.btncontainer}>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress = {()=> clickLocal()}>
                    <Ionicons name = {localIcon} size={25} color = {localColor}></Ionicons>
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