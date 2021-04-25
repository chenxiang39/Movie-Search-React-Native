import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image,ImageBackground,TouchableOpacity,StyleSheet, FlatList} from 'react-native';
import {Dimensions} from 'react-native';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default horizonlist = (props) => {
    const ClickFun = (item) =>{
        props.navigation.navigate('Details',{
            id:item.id,
            type:item.type
        })
    }
    const renderItem = ({item,index}) =>{
        return (
            <TouchableOpacity style={styles.container} onPress = {()=>ClickFun(item)}>
                <Image style={styles.pic} source = {{uri:item.poster_path}} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>({item.date})</Text>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data = {props.data}
            renderItem = {renderItem}
            keyExtractor = {item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
        </FlatList>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        width:(0.92 * deviceWidth - 0.2 * deviceWidth)/3,
        marginRight:0.1 * deviceWidth
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
    }
}); 