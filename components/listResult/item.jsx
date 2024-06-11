import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT, SHADOWS } from "../../constants/theme";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { RoomService } from "../../service/roomService";

const { width, height } = Dimensions.get("screen");
const Item = ({ item }) => {
    const [star, setStar] = useState(5);
    const roomService = new RoomService();
    useEffect(() => {
        const res = roomService.getStarByRoomId(item.id);
        if (res > 0) setStar(res);
    }, []);

    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`hotel/infoRoom/${item.id}`);
            }}
            // style={styles.item}
        >
            <View style={styles.item}>
                <Image
                    style={styles.image2}
                    source={{
                        uri: item.images[0] || item.images,
                    }}
                    resizeMode="cover"
                />
                <View style={styles.right}>
                    <View style={styles.t1}>
                        <Text style={styles.text1}>
                            {item.accommodation.name}
                        </Text>
                        <Text style={styles.text2}>
                            Phòng số: {item.roomNumber}
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
                                    {item.accommodation.address}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", gap: 2 }}>
                                {Array.from({ length: star }, (_, index) => (
                                    <Image
                                        key={index + "x"}
                                        source={icons.star}
                                        style={{ width: 10, height: 10 }}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={styles.t3}>
                            <Text
                                style={[styles.text4, { textAlign: "right" }]}
                            >
                                {item.price} k
                            </Text>
                            <Text
                                style={[styles.text5, { textAlign: "right" }]}
                            >
                                /đêm
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Item;

const styles = StyleSheet.create({
    image2: {
        height: "100%",
        width: "100%",
        maxWidth: 150,
        borderRadius: 20,
        backgroundColor: "aqua",
    },

    item: {
        width: 0.9 * width,
        // backgroundColor: "red",
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
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginRight: 8,
    },
    icon: {
        flexDirection: "row",
        bottom: 0,
    },
    t2: {
        maxWidth: 100,
    },
    t3: {
        flexDirection: "row",
        alignItems: "flex-end",
    },

    text1: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },

    text2: {
        fontSize: 9,
        color: COLORS.black,
        fontFamily: FONT.regular,
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
