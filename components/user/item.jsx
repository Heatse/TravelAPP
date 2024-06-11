import React from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ icon, text, href, text2 }) => {
    const onClick = () => {
        if (text === "Log out") {
            AsyncStorage.removeItem("userId");
            AsyncStorage.removeItem("cookies");
        }
        router.push(href);
    };

    return (
        <TouchableOpacity onPress={onClick} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            {icon && <Image source={icon} style={styles.icon} />}
            {!icon && text2 && <Text style={styles.text2}>{text2}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    icon: {
        width: 20,
        height: 20,
    },
    text: {
        fontSize: 16,
        fontFamily: FONT.medium,
    },
    text2: {
        fontFamily: FONT.medium,
        color: COLORS.gray2,
    },
});

export default Item;
