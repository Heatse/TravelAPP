import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../ui/button";
import { COLORS, FONT } from "../../constants/theme";
import { router } from "expo-router";
import icons from "../../constants/icons";

const List = ({ item }) => {
    const handleChoose = () => {
        router.push(`listResult/infoResult/${item.id}`);
    };
    return (
        <View style={styles.listpage}>
            <View style={{ backgroundColor: "gray" }}>
                <Image
                    style={styles.image}
                    source={{ uri: item.images[0] }}
                    resizeMode="cover"
                    aspectRatio={414 / 230}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.text}>
                    <Text style={styles.text1} numberOfLines={1}>
                        {item.name}
                    </Text>
                    {/* {item.text2 && (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-end",
                                gap: 20,
                            }}
                        >
                            <Text style={styles.text2}>{item.text2}</Text>
                            <Text>Per Night</Text>
                        </View>
                    )}
                    {item.location && (
                    )} */}
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={icons.location}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text style={styles.location}>{item.address}</Text>
                    </View>
                </View>
                <View style={styles.bt}>
                    <Button
                        style={styles.button}
                        variant="primary"
                        onPress={handleChoose}
                    >
                        View Detail
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    listpage: {
        flex: 1,
        alignItems: "center",
        alignItems: "flex-start",
        backgroundColor: COLORS.white,
        marginBottom: 20,
    },
    image: {
        maxHeight: 230,
        width: "100%",
    },
    info: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingTop: 8,
        justifyContent: "space-between",
    },

    text: {
        maxWidth: "70%",
    },

    text1: {
        fontSize: 20,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },
    text2: {
        fontSize: 20,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },

    button: {
        borderRadius: 20,
    },
});
