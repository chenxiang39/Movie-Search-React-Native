import * as React from 'react';
import {useState, useEffect,useRef, useCallback} from 'react';
import { View, Text, Image,TouchableOpacity,StyleSheet, FlatList,Linking} from 'react-native';
import watchlistLocalStorage from '../localStorage/watchlist'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Dimensions} from 'react-native';
import {ContextMenuView} from "react-native-ios-context-menu"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {watchlistDataModel} from '../dataModel/Watchlist'
import {ToastCustomShow} from '../common/toastCustom'
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default contentMenuList = (props) => {
    const [isLocalData, SetisLocalData] = useState([]);
    const [loadFlag, SetloadFlag] = useState(false);
    const [canClick, SetcanClick] = useState(true);
    useFocusEffect(
        useCallback(() => {
          updateLocalData();
          SetloadFlag(true);
          return () => {
            
          };
        }, [])
    );
    useEffect(async()=>{
        SetloadFlag(false);
        try{
            let data = await watchlistLocalStorage.checkContainItemArr(watchlistDataModel(props.data));
            SetisLocalData(data);
        }catch(e){
            alert(e)
        }
    },[loadFlag,canClick])
    const updateLocalData = async () =>{
        SetloadFlag(false);
        let data = await watchlistLocalStorage.checkContainItemArr(watchlistDataModel(props.data));
        SetisLocalData(data);
        SetloadFlag(true);
    }
    const facebookIcon = Image.resolveAssetSource(FontAwesome.getImageSourceSync('facebook-f',60,'black'));
    const twitterIcon = Image.resolveAssetSource(Entypo.getImageSourceSync('twitter',60,'black'));
    const ClickFun = (item) =>{
        if(canClick){
            props.navigation.navigate('Details',{
                screen: 'detail',
                params:{
                    id:item.id,
                    type:item.type,
                }
            })
        }
    }
    const contentMenuBtnFun = async (e,item,index) =>{
        switch (e.actionKey) {
            case 'local':
                SetloadFlag(false);
                if(!isLocalData[index]){
                    await watchlistLocalStorage.addItemToTail(item.id,item.type,item.poster_path);
                    let notice = item.title + ' was added to Watchlist' 
                    Toast.show(ToastCustomShow(notice));
                }
                else{
                    await watchlistLocalStorage.clearItem(item.id,item.type,item.poster_path);
                    let notice = item.title + ' was removed from Watchlist' 
                    Toast.show(ToastCustomShow(notice));
                }
                SetloadFlag(true);
                break;

            case 'facebook':
                let fblink = 'https://www.themoviedb.org/' + item.type + '/' + item.id; 
                let facebooklink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(fblink)
                Linking.openURL(facebooklink).catch((err) =>
                    console.error('An error occurred', err),
                );
                break;
            case 'twitter':
                let twlink = 'Check out this link:\nhttps://www.themoviedb.org/' + item.type + '/' + item.id + ' #CSCI571USCFilms'; 
                let twitterlink = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twlink)
                Linking.openURL(twitterlink).catch((err) =>
                    console.error('An error occurred', err),
                );
                break;
            };
    }
    const disableClick = () =>{
        SetcanClick(false);
    }
    const enableClick = () =>{
        SetcanClick(true);
    }
    const isInIcon = Image.resolveAssetSource(Ionicons.getImageSourceSync('bookmark',60,'black'));
    const notInIcon = Image.resolveAssetSource(Ionicons.getImageSourceSync('bookmark-outline',60,'black'));
    const renderItemMovieOrTV = ({item,index}) =>{
        return (
            <View style = {styles.container}>
                <ContextMenuView
                    lazyPreview = {false}
                    onMenuWillShow = {()=> disableClick()}
                    onMenuWillHide = {()=> enableClick()}
                    // onMenuDidShow = {()=>updatelocalData(item)}
                    onPressMenuItem={({nativeEvent})=>contentMenuBtnFun(nativeEvent,item,index)}
                    previewConfig={{
                        backgroundColor: 'white'
                    }}
                    menuConfig={{
                        menuTitle: '',
                        menuItems: [{
                        actionKey  : 'local',
                        actionTitle: isLocalData[index]?'Remove from watchList':'Add to watchList',
                        icon: {
                            iconType : 'REQUIRE',
                            iconValue: isLocalData[index]?isInIcon:notInIcon
                        }
                        }, {
                        actionKey  : 'facebook',
                        actionTitle: 'Share On FaceBook',
                        icon: {
                            iconType : 'REQUIRE',
                            iconValue: facebookIcon,
                        }
                        }, {
                        actionKey  : 'twitter',
                        actionTitle: 'Share On Twitter',
                        icon: {
                            iconType : 'REQUIRE',
                            iconValue: twitterIcon,
                        }
                        }],
                    }}
                    >
                <TouchableOpacity style={styles.container1} 
                    onPress = {()=>ClickFun(item)}
                >
                    <Image style={styles.pic} source = {{uri:item.poster_path}} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>({item.date})</Text>
                    <View style={styles.space}></View>
                </TouchableOpacity>
                </ContextMenuView>
               <View style = {styles.space2}></View>
            </View>
        )
    }
        if(!loadFlag){
            return (
                <View>     
                    <FlatList
                        data = {props.data}
                        renderItem = {renderItemMovieOrTV}
                        keyExtractor = {item => item.id}
                        horizontal={true}
                    >
                    </FlatList>
                </View>
            )
        }
        else{
            return (
                <View></View>
            )
        }
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row'
    },
    container1:{
        display:'flex',
        flexDirection:'column',
        width:(0.92 * deviceWidth - 0.2 * deviceWidth)/3,
       
    },
    container2:{
        display:'flex',
        flexDirection:'column',
        width: 70,
        marginRight:20
    },
    container3:{
        display:'flex',
        flexDirection:'column',
        width:(0.92 * deviceWidth - 0.2 * deviceWidth)/3,
        marginRight:30
    },
    pic: {
        height:150,
        borderRadius:8
    },
    title:{
        marginTop:5,
        textAlign:'center',
        lineHeight:16,
        color:'black',
        fontSize:12,
        fontWeight:'bold'
    },
    time:{
        textAlign:'center',
        color:'rgb(100,100,100)',
        fontSize:12,
    },
    space:{
        height:20
    },
    space2:{
        width:30,
    }
}); 
