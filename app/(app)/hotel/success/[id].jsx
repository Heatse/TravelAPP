import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../../../../components/ui/button";
import { COLORS, FONT } from "../../../../constants/theme";

const Success = () => {
    const { id } = useLocalSearchParams();

    const [booking, setBooking] = useState('')

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <Image
                source={require("../../../../assets/images/order_confirm.png")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>Booking Success</Text>
            <Text style={styles.reminder}>
                Don't forget to check your email for further details.
            </Text>
            <View style={styles.buttonsContainer}>
                <Button
                    onPress={() => {
                        router.push("/home");
                    }}
                    style={styles.button}
                    variant="primary"
                >
                    Return HomePage
                </Button>
                <Button
                    onPress={() => {
                        router.push(`/detail/room/${id}`);
                    }}
                    style={styles.button}
                    variant="outline"
                >
                    View Detail
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    image: {
        width: 400,
        height: 400,
    },
    text: {
        fontSize: 24,
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
    reminder: {
        fontSize: 12,
        fontFamily: FONT.regular,
        color: COLORS.primary,
        marginBottom: 24,
    },
    buttonsContainer: {
        flexDirection: "row",
        marginHorizontal: 24,
        gap: 12,
    },
    button: {
        flex: 1,
    },
});

export default Success;
