import * as React from 'react';
import { useState,useEffect,useCallback} from 'react';
import {Button, View, StyleSheet, Linking} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import watchlistLocalStorage from '../localStorage/watchlist'
import {ToastCustomShow} from '../common/toastCustom'
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
        useFocusEffect(
            useCallback(() => {
              updateLocalData();
              return () => {
                
              };
            }, [])
          );
        useEffect(async ()=>{
            updateLocalData();
        },[isLocal,props])
        const clickLocal = async () =>{
            if(isLocal){
                await watchlistLocalStorage.clearItem(props.id,props.type,props.url);
                let notice = props.title + ' was removed from Watchlist' 
                Toast.show(ToastCustomShow(notice));
                SetisLocal(false);
            }
            else{
                await watchlistLocalStorage.addItemToTail(props.id,props.type,props.url);
                let notice = props.title + ' was added to Watchlist' 
                Toast.show(ToastCustomShow(notice));
                SetisLocal(true);
            }
        }
        const updateLocalData = async () =>{
            let data = await watchlistLocalStorage.checkContainItem(props.id,props.type,props.url);
            SetisLocal(data);
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