import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SHADOWS } from "../../constants/theme";
import icons from "../../constants/icons";
import { router } from "expo-router";

const Intro4 = ({ item }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`hotel/infoRoom/${item.id}`);
            }}
            style={styles.item}
        >
            <Image
                style={styles.image2}
                source={{
                    uri: item.images[0],
                }}
                resizeMode="cover"
            />
            <View style={styles.right}>
                <View style={styles.t1}>
                    <Text style={styles.text1}>
                        {item?.accommodation?.name}
                    </Text>
                    <Text style={styles.text2}>
                        {item.accommodation?.type + " : " + item.roomNumber}
                    </Text>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.t2}>
                        <View style={styles.icon}>
                            <Image
                                source={icons.location}
                                style={{ width: 10, height: 10 }}
                            />
                            <Text style={styles.text3}>
                                {item?.accommodation?.address}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>{stars}</View>
                    </View>
                    <View style={styles.t3}>
                        <Text
                            numberOfLines={1}
                            style={[styles.text4, { textAlign: "right" }]}
                        >
                            {item.price} k
                        </Text>
                        <Text style={[styles.text5, { textAlign: "right" }]}>
                            {Boolean(item.available) ? "Còn Phòng" : "Mỗi đêm"}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const numStars = Math.floor(Math.random() * 3) + 3; // Số ngôi sao từ 3 đến 5

const stars = [];
for (let i = 0; i < 5; i++) {
    if (i < numStars) {
        stars.push(
            <Image
                key={i}
                source={icons.star}
                style={{ width: 10, height: 10 }}
            />
        );
    }
}

export default Intro4;

const styles = StyleSheet.create({
    image2: {
        height: "100%",
        width: "100%",
        maxWidth: 150,
        borderRadius: 20,
        backgroundColor: "gray",
    },

    item: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.gray,
        height: 150,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    right: {
        flex: 1,
        justifyContent: "space-between",
    },
    bottom: {
        zIndex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginRight: 8,
    },
    icon: {
        flexDirection: "row",
        bottom: 0,
        alignItems: "flex-start",
    },
    t2: {
        maxWidth: 100,
    },
    t3: {
        width: "50%",
        paddingRight: 8,
    },

    text1: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },

    text2: {
        fontSize: 12,
        color: COLORS.black,
        fontFamily: FONT.semibold,
    },

    text3: {
        fontSize: 9,
        color: COLORS.black,
        fontFamily: FONT.regular,
    },

    text4: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },

    text5: {
        fontSize: 10,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },
});
