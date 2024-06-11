import { Stack, router } from "expo-router";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT } from "../../../../constants/theme";
import Carousel from "../../../../components/ui/carousel";
import { useState } from "react";
import Button from "../../../../components/ui/button";

const image = require("../../../../assets/images/order.png");

const Select = () => {
    const [quantity, setQuantity] = useState(1);
    const onhandleRoomQuantity = (count) => {
        setQuantity(count);
    };
    return (
        <View style={styles.selectPage}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.black2,
                    },
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 22,
                        fontFamily: FONT.bold,
                    },
                    headerTitleAlign: "center",
                    headerTintColor: COLORS.white,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.headerRightText}>
                                &#10084;&#65039;
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ImageBackground
                style={styles.bg}
                resizeMode="cover"
                source={image}
            >
                <View style={styles.box}>
                    <View style={styles.leftBox}>
                        <Text
                            style={{
                                fontSize: 30,
                                fontFamily: FONT.bold,
                                color: COLORS.white,
                            }}
                        >
                            Mandarin Oriental
                        </Text>
                        <View style={{ gap: 8 }}>
                            <Text
                                style={{
                                    fontFamily: FONT.regular,
                                    fontSize: 9,
                                    color: COLORS.white,
                                }}
                            >
                                📍 Bang Rak, Bangkok 10500, Thailand
                            </Text>
                            <Text>⭐⭐⭐⭐</Text>
                        </View>
                    </View>
                    <View style={styles.rightBox}>
                        <Text
                            style={{
                                fontSize: 30,
                                fontFamily: FONT.semiboldI,
                                color: COLORS.white,
                                textAlign: "right",
                            }}
                        >
                            {99 * quantity} $
                        </Text>
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: FONT.medium,
                                    color: COLORS.white,
                                    marginBottom: -16,
                                }}
                            >
                                Quantity:{" "}
                            </Text>
                            <Carousel
                                initialValue={1}
                                onNumberChange={onhandleRoomQuantity}
                                arrowColor={COLORS.white}
                                numberColor={COLORS.white}
                                customStyle={{ textAlign: "right" }}
                            />
                        </View>
                        <Button
                            onPress={() => {
                                router.push("detail/room/1");
                            }}
                            style={styles.button}
                        >
                            Bookings
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Select;

const styles = StyleSheet.create({
    selectPage: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerRightText: {
        borderRadius: 99999,
        borderWidth: 1,
        borderColor: "red",
        textAlign: "center",
        padding: 4,
        width: 30,
        height: 30,
        backgroundColor: COLORS.white,
    },
    bg: {
        flex: 1,
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
    },
    box: {
        width: "80%",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 30,
        marginBottom: 100,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftBox: {
        width: "50%",
        gap: 8,
    },
    rightBox: {
        width: "50%",
        alignItems: "flex-end",
    },
    button: {
        width: 120,
    },
});
