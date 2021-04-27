import * as React from 'react';
import {useState} from 'react';
import { View, Text, Image,TouchableOpacity,StyleSheet, FlatList} from 'react-native';
import {Dimensions} from 'react-native';
global.deviceWidth = Dimensions.get('window').width
global.deviceHeight = Dimensions.get('window').height
export default verticallist = (props) => {
    const reviewClickFun = (item) =>{
        props.navigation.navigate("review",{
            title:props.title,
            author: item.author,
            created_at: item.created_at,
            rating:item.rating,
            content:item.content
        })
    }
    const searchClickFun = (item) =>{
        props.navigation.navigate('Details',{
            screen: 'detail',
            params:{
                id:item.id,
                type:item.media_type
            }
        })
    }
    const renderReview = () =>{
        let review = [];
        for(let i = 0 ; i < props.data.length; i++){
            let item = props.data[i];
            review.push(
                <TouchableOpacity key = {i} onPress = {() => reviewClickFun(item)}>
                    <View style = {styles.containerReview}>
                        <Text style = {styles.reviewTitle}>A review by {item.author}</Text>
                        <Text style = {styles.reviewDes}>Written by {item.author} on {item.created_at}</Text>
                        <View style = {[styles.info]}>
                            <Text style = {[styles.red]}>★  </Text>
                            <Text style = {[styles.ratText]}>{item.rating}</Text>
                        </View>
                        <Text style = {styles.reviewContent} numberOfLines = {3}>{item.content}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return review;
    }
    const renderSearchItem = ({item, index}) =>{
        return (
            <TouchableOpacity style={[styles.containerSearch]} 
                onPress = {()=>searchClickFun(item)}>
                <Image style={styles.searchImg} source = {{uri:item.backdrop_path}} />
                <Text style = {styles.searchTitle}>{item.media_type.toUpperCase()}({item.date})</Text>
                <Text style = {styles.searchName}>{item.name}</Text>
                <Text style = {[styles.SearchRed]}>★</Text>
                <Text style = {[styles.vote]}>{item.vote_average}</Text>
            </TouchableOpacity>
        )
    }
    if(props.name === "review"){
        return (
           renderReview()
        )
    }
    else if(props.name === "search"){
        return (
            <FlatList
                data = {props.data}
                renderItem = {renderSearchItem}
                keyExtractor = {item => item.id}
                horizontal={false}>
            </FlatList>
        )
    }
    else{
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    containerSearch:{
        margin:10,
        marginLeft:15,
        marginRight:15,
        borderRadius:15
    },
    searchImg:{
        width:'100%',
        height:190,
        borderRadius:15
    },
    searchTitle:{
        position:'absolute',
        color:'white',
        fontSize:18,
        fontWeight:'600',
        bottom: 150,
        left:20
    },
    searchName:{
        position:'absolute',
        color:'white',
        fontSize:18,
        fontWeight:'600',
        bottom: 20,
        left:20
    },
    vote:{
        position:'absolute',
        color:'white',
        fontSize:18,
        fontWeight:'600',
        top: 20,
        right:20
    },
    SearchRed:{
        position:'absolute',
        color:'red',
        fontSize:18,
        fontWeight:'600',
        top: 20,
        right:50
    },
    containerReview:{
        borderStyle:'solid',
        borderColor:'rgb(143,143,143)',
        borderWidth:1,
        borderRadius:10,
        padding:8,
        marginBottom:10
    },
    reviewTitle:{
        fontSize:18,
        fontWeight:'bold',
    },
    reviewDes:{
        marginTop:2,
        fontSize:16,
        color:'rgb(143,143,143)'
    },
    info:{
        display:'flex',
        flexDirection:'row',
        marginTop:10,
        fontSize:16,
    },
    ratText:{
        lineHeight:25,
        fontSize:16,
    },
    red:{
        color:'red',
        fontSize:20
    },
    reviewContent:{
        marginTop:10,
        fontSize:14,
        color:'black'
    }
}); 