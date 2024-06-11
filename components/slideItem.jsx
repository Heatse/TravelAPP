import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FONT } from "../constants/theme";

const {width, height} = Dimensions.get('screen')

const SlideItem = ({item}) => {
    return ( 
        <View style= {styles.container}>
            <Image style={styles.image} source={item.url} resizeMode="cover"/>
            <Text style = {styles.title}>
                {item.title}
            </Text>
            <Text style = {styles.des}>
                {item.des}
            </Text>
        </View>
    );
}
 
export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width,
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 40
    },
    image: {
        width: 300,
        height: 300,
    },
    title: {
        marginTop: 40,
        fontFamily: FONT.bold,
        fontSize: 30,
    },
    des: { 
        marginTop: 18,
        fontFamily: FONT.regular,
        fontSize: 12,
        width: 200,
        textAlign: 'center'
    }
})