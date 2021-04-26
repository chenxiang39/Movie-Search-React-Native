import * as React from 'react';
import {useState} from 'react';
import { View, Text, Image,TouchableOpacity,StyleSheet, FlatList} from 'react-native';
import {Dimensions} from 'react-native';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default horizonlist = (props) => {
    const [modelVisible, SetmodelVisible] = useState(false)
    const ClickFun = (item) =>{
        props.navigation.navigate('Details',{
            screen: 'detail',
            params:{
                id:item.id,
                type:item.type
            }
        })
    }
    const LongClickFun = (item) =>{
        SetmodelVisible(visible => !visible);
    }
    const cancelModal = () =>{
        SetmodelVisible(false);
    }
    const renderItemMovieOrTV = ({item,index}) =>{
        return (
            <TouchableOpacity style={styles.container1} 
                onPress = {()=>ClickFun(item)}
                onLongPress = {()=>LongClickFun(item)}
            >
                <Image style={styles.pic} source = {{uri:item.poster_path}} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>({item.date})</Text>
                <View style={styles.space}></View>
            </TouchableOpacity>
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
    else{
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    container1:{
        display:'flex',
        flexDirection:'column',
        width:(0.92 * deviceWidth - 0.2 * deviceWidth)/3,
        marginRight:0.1 * deviceWidth,
    },
    container2:{
        display:'flex',
        flexDirection:'column',
        width: 70,
        marginRight:20
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
    }
}); 