import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { COLORS, FONT } from "../../../../../constants/theme";
import icons from "../../../../../constants/icons";
import ComparePage from "../../../../../components/hotel/comparepage";

const Comparepage = () => {
    const { currentRoomId, compareRoomId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Stack.Screen
                        options={{
                            headerStyle: {
                                backgroundColor: "rgb(242,242,242)",
                            },
                            headerTintColor: "#000",
                            headerShadowVisible: false,
                            headerTitleStyle: {},
                            headerTitleAlign: "center",
                        }}
                    />
                </View>

                <View style={styles.optionsContainer}>
                    <Text style={styles.option}>Review</Text>
                    <Text style={styles.option}>Popular</Text>
                    <Text style={styles.option}>Cheap</Text>
                </View>

                <View style={styles.flatListContainer}>
                    <ComparePage currentRoomId={currentRoomId} compareRoomId={compareRoomId} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Comparepage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    optionsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        marginTop: 30,
        backgroundColor: COLORS.gray3,
        borderRadius: 20,
        alignItems: "center",
    },
    option: {
        fontSize: 20,
        fontFamily: FONT.bold,
        color: COLORS.primary,
        textAlign: "center",
        lineHeight: 50,
    },
    flatListContainer: {
        flex: 1,
        padding: 10,
    },
    text: {
        flexDirection: "row",
        marginLeft: 10,
    },
    text1: {
        fontSize: 20,
        fontFamily: FONT.bold,
    },
    text2: {
        fontSize: 18,
        fontFamily: FONT.regular,
    },
    text3: {
        fontSize: 22,
        fontFamily: FONT.bold,
        marginLeft: 100,
        justifyContent: "flex-end",
    },
    starIcon: {
        width: 10,
        height: 10,
        top: 10,
        left: 5,
    },
});
