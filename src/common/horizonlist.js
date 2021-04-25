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
            id:item.id,
            type:item.type
        })
    }
    const LongClickFun = (item) =>{
        SetmodelVisible(visible => !visible);
    }
    const cancelModal = () =>{
        SetmodelVisible(false);
    }
    const renderItem = ({item,index}) =>{
        return (
            <TouchableOpacity style={styles.container} 
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
    return (
        <View>
            <FlatList
                data = {props.data}
                renderItem = {renderItem}
                keyExtractor = {item => item.id}
                horizontal={true}
            >
            </FlatList>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        width:(0.92 * deviceWidth - 0.2 * deviceWidth)/3,
        marginRight:0.1 * deviceWidth,
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
    }
}); 