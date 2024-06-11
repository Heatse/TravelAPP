import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { COLORS, FONT } from "../../constants/theme";
import Button from "../ui/button";
import { router } from "expo-router";

const { width, height } = Dimensions.get("screen");

const Intro1 = ({ item }) => {
    return (
        <ImageBackground
            source={{
                uri: item.images[0],
            }}
            resizeMode="cover"
            style={styles.image}
        >
            <View style={styles.view1}>
                <Text style={styles.text1}>
                    {item.name || "Văn Miếu Quốc Tử Giám"}
                </Text>
                <Text style={styles.text2}>
                    {item.address || "Hà Nội, Việt Nam"}
                </Text>
                <Text style={styles.text2}>
                    {item.shortDes || "Di tích lịch sử Quốc gia"}
                </Text>
                <Button
                    onPress={() => {
                        router.push(`listResult/infoResult/${item.id}`);
                    }}
                    style={styles.button}
                    variant="primary"
                >
                    View Detail
                </Button>
            </View>
        </ImageBackground>
    );
};

export default Intro1;

const styles = StyleSheet.create({
    image: {
        width,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 21,
        height: 0.6 * height,
        justifyContent: "flex-end",
    },

    image2: {
        width: 290,
        height: 188,
        borderRadius: 20,
        paddingLeft: 30,
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
    },

    text1: {
        fontSize: 30,
        fontFamily: FONT.bold,
        color: COLORS.white,
    },

    text2: {
        fontSize: 12,
        fontFamily: FONT.regular,
        color: COLORS.white,
    },

    view1: {
        alignItems: "flex-start",
        justifyContent: "flex-end",

        borderRadius: 30,
    },
});
