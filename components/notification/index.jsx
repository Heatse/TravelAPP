import { Image, StyleSheet, Text, View } from "react-native";
import icons from "../../constants/icons";
import { FONT, SHADOWS } from "../../constants/theme";

const Item = ({item, style}) => {
    return ( 
        <View style = {[styles.item, style]}>
            <View style = {styles.left}>
                <Image source={icons.bellNotifi} />
            </View>
            <View style = {styles.right}>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.detail}>{item.detail}</Text>
                <Text style = {styles.time}>{item.time}</Text>
            </View>
        </View>
     );
}
 
export default Item;
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 16,
        alignItems:'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 14,
        fontFamily: FONT.bold,
    },
    detail: {
        fontSize: 9,
        fontFamily: FONT.regular,
    },
    time: {
        fontSize: 9,
        fontFamily: FONT.regular,
    },
})