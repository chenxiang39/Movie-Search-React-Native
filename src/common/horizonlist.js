import * as React from 'react';
import {useState} from 'react';
import { View, Text, Image,TouchableOpacity,StyleSheet, FlatList,Linking} from 'react-native';
import {Dimensions} from 'react-native';
import {ContextMenuView} from "react-native-ios-context-menu"
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default horizonlist = (props) => {
    const [modelVisible, SetmodelVisible] = useState(false)
    const ClickFun = (item) =>{
        if(props.route.name === "USC Films"){
            props.navigation.navigate('Details',{
                screen: 'detail',
                params:{
                    id:item.id,
                    type:item.type,
                }
            })
        }
        else if(props.route.name === "detail"){
            props.navigation.push('detail',{
                id:item.id,
                type:item.type
            })
        }
    }
    const contentMenuBtnFun = (e,item) =>{
        switch (e.actionKey) {
            case 'save':
                alert('saving...');
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
    const myImage = require('../img/twitter.png');
    const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    const resolvedImage = Image.resolveAssetSource(myImage);
    const renderItemMovieOrTV = ({item,index}) =>{
        return (
            <View style = {styles.container}>
                <ContextMenuView
                    onPressMenuItem={({nativeEvent})=>contentMenuBtnFun(nativeEvent,item)}
                    previewConfig={{
                        backgroundColor: 'white'
                      }}
                    menuConfig={{
                        menuTitle: '',
                        menuItems: [{
                        actionKey  : 'local',
                        actionTitle: 'local',
                        icon: {
                            iconType : 'SYSTEM',
                            iconValue: 'square.and.arrow.down',
                        }
                        }, {
                        actionKey  : 'facebook',
                        actionTitle: 'Share On FaceBook',
                        icon: {
                            iconType : 'REQUIRE',
                            iconValue: '',
                        }
                        }, {
                        actionKey  : 'twitter',
                        actionTitle: 'Share On Twitter',
                        icon: {
                            iconType : 'SYSTEM',
                            iconValue: 'play',
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
                {/* </ContextMenu> */}
               <View style = {styles.space3}></View>
            </View>
        )
    }
    const renderCastItem = ({item,index}) =>{
        return (
            <View  style={styles.container2}>
                <Image style={styles.picRound} source = {{uri:item.profile_path}} />
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.space2}></View>
            </View>
        )
    }
    const renderRecommendedItem = ({item,index}) =>{
        return (
            <TouchableOpacity style={[styles.container3]} 
                onPress = {()=>ClickFun(item)}
            >
                <Image style={styles.pic} source = {{uri:item.poster_path}} />
                <View style={styles.space}></View>
            </TouchableOpacity>
        )
    }
    if(props.name === "movieOrtv"){
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
    else if(props.name === "cast"){
        return (
            <View>
                <FlatList
                    data = {props.data}
                    renderItem = {renderCastItem}
                    keyExtractor = {item => item.id}
                    horizontal={true}
                >
                </FlatList>
            </View>
        )
    }
    else if(props.name === "recommended"){
        return (
            <View>
                 <FlatList
                    data = {props.data}
                    renderItem = {renderRecommendedItem}
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
    picRound:{
        borderRadius:70,
        height:70,
        width:70,
    },
    name:{
        marginTop:15,
        textAlign:'center',
        lineHeight:16,
        color:'black',
        fontSize:12,
    },
    space:{
        height:20
    },
    space2:{
        height:10
    },
    space3:{
        width:30,
    }
}); 