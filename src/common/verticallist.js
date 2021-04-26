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
    if(props.name === "review"){
        return (
           renderReview()
        )
    }
    else if(props.name === "cast"){
        return (
            <View>
           
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
    containerReview:{
        borderStyle:'solid',
        borderColor:'rgb(143,143,143)',
        borderWidth:1,
        borderRadius:10,
        padding:8,
        marginBottom:10
    },
    reviewTitle:{
        fontSize:16,
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