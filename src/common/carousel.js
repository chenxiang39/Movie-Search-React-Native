import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image,ImageBackground,TouchableOpacity,StyleSheet} from 'react-native';
export default carousel = (props) => {
    const ClickFun = (item) =>{
        props.navigation.navigate('Details',{
            id:item.id,
            type:item.type
        })
    }
    renderItem = ({item,index}) =>{
        return (
            <TouchableOpacity onPress = {()=>ClickFun(item)}>
                <View style={styles.container}>
                    <ImageBackground style={styles.pic} blurRadius={8} source = {{uri:item.backdrop_path}} />
                    <Image style={[styles.pic,styles.small]} source = {{uri:item.backdrop_path}} /> 
                </View>
            </TouchableOpacity>
        )
    }
    return (
            <Carousel
              data={props.data}
              renderItem={this.renderItem}
              sliderWidth={props.sliderWidth}
              itemWidth={props.itemWidth}
              lockScrollWhileSnapping={true}
              inactiveSlideScale= {1}
              loop={true}
              autoplay={true}
            />
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
    },
    pic: {
        height:300,
    },
    small:{
        display:'flex',
        alignSelf:'center',
        width:220,
        position:'relative',
        top:-300
    }
}); 