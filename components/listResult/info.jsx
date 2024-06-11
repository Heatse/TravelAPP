import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const image = require("../../assets/images/vanMieu.png");

const Info = ({ item }) => {
    return (
        <View style={styles.info}>
            <View>
                <Image
                    style={styles.image}
                    source={{ uri: item }}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
};

export default Info;

const styles = StyleSheet.create({
    info: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 432,
        height: 257,
    },
});
