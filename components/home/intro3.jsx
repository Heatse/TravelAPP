import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import { router } from "expo-router";

const Intro3 = ({ item }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`listResult/infoResult/${item.id}`);
            }}
            style={styles.item}
        >
            <Text style={styles.text}>{item.name || "Văn Miếu"}</Text>
            <Image
                style={styles.image2}
                source={{ uri: item.images[0] }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
};

export default Intro3;

const styles = StyleSheet.create({
    image2: {
        width: 290,
        height: 188,
        borderRadius: 20,
    },

    item: {
        marginLeft: 22,
        position: "relative",
    },

    text: {
        position: "absolute",
        zIndex: 1,
        top: 12,
        left: 18,
        fontSize: 22,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
});
