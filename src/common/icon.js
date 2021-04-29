import { View, Text, Image,TouchableOpacity,StyleSheet, FlatList,Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
global.facebookIcon;
global.twitterIcon;
global.isInIcon;
global.notInIcon;
export const loadIcon = async () => {
    facebookIcon = await Image.resolveAssetSource(FontAwesome.getImageSourceSync('facebook-f',60,'black'));
    twitterIcon = await Image.resolveAssetSource(Entypo.getImageSource('twitter',60,'black'));
    isInIcon = await Image.resolveAssetSource(Ionicons.getImageSource('bookmark',60,'black'));
    notInIcon = await Image.resolveAssetSource(Ionicons.getImageSource('bookmark-outline',60,'black'));
}

export const getIcon = () =>{
    if(!!facebookIcon){
        return {
            facebookIcon:facebookIcon,
            twitterIcon:twitterIcon,
            isInIcon:isInIcon,
            notInIcon:notInIcon
        }
    }
}