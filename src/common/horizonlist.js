import * as React from 'react';
import { View, Text, Image,TouchableOpacity,StyleSheet, FlatList,Linking} from 'react-native';
import {Dimensions} from 'react-native';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default horizonlist = (props) => {
    const ClickFun = (item) =>{
        props.navigation.push('detail',{
            id:item.id,
            type:item.type
        })
    }
    const renderCastItem = ({item,index}) =>{
        return (
            <View  style={styles.container}>
                <Image style={styles.picRound} source = {{uri:item.profile_path}} />
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.space2}></View>
            </View>
        )
    }
    const renderRecommendedItem = ({item,index}) =>{
        return (
            <TouchableOpacity style={[styles.container1]} 
                onPress = {()=>ClickFun(item)}
            >
                <Image style={styles.pic} source = {{uri:item.poster_path}} />
                <View style={styles.space}></View>
            </TouchableOpacity>
        )
    }
    if(props.name === "cast"){
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
        flexDirection:'column',
        width: 70,
        marginRight:20
    },
    container1:{
        display:'flex',
        flexDirection:'column',
        width:(0.92 * deviceWidth - 0.2 * deviceWidth)/3,
        marginRight:30
    },
    pic: {
        height:150,
        borderRadius:8
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
}); 