import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image,TouchableOpacity,StyleSheet} from 'react-native';
export default carousel = (props) => {
    renderItem = ({item,index}) =>{
        return (
            <TouchableOpacity>
                <Image style={styles.bigPic} source = {{uri:item.backdrop_path}} />
            </TouchableOpacity>
        )
    }
    return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={props.data}
              renderItem={this.renderItem}
              sliderWidth={props.sliderWidth}
              itemWidth={props.itemWidth}
              autoplay={true}
            />
    )
}

const styles = StyleSheet.create({
    bigPic: {
        height:300
    },
});