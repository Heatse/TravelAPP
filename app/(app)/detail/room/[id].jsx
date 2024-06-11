import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT } from "../../../../constants/theme";
import { RoomService } from "../../../../service/roomService";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import Button from "../../../../components/ui/button";

const DetailTicket = () => {
    const { id } = useLocalSearchParams();
    const [bookingRoom, setBookingRoom] = useState();
    const roomService = new RoomService();

    const handleCancel = async () => {
        try {
            const response = await roomService.cancelBooking(id);
            console.log(response);
            if (response) {
                router.push(`home`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        (async () => {
            const response = await roomService.getBookingRoomById(id);
            setBookingRoom(response);
        })();
    }, []);

    const item = {
        firm: bookingRoom?.room?.accommodation?.name || "SPRING HOTEL",
        codeRoom: bookingRoom?.room?.roomNumber || "XXX",
        service: bookingRoom?.room?.type || "VIP ROOM",
        quantity: bookingRoom?.room?.capacity || "1",
        namePassenger:
            bookingRoom?.user?.firstName + ", " + bookingRoom?.user?.lastName ||
            "Nguyen Van A",
        date: bookingRoom?.bookingDate.slice(0, 10),
        checkin: bookingRoom?.checkInDate,
        checkout: bookingRoom?.checkOutDate,
    };

    const values = Object.values(item);
    const concatenatedString = values.join(" ");

    return (
        <View style={styles.detailTicket}>
            <ScrollView>
                <Stack.Screen
                    options={{
                        headerTintColor: "#000",
                        headerShadowVisible: false,
                    }}
                />
                <View style={styles.header}>
                    <Text style={styles.firm}>{item.firm}</Text>
                    <Text style={{ fontSize: 20, fontFamily: FONT.bold }}>
                        Ticket Room
                    </Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.info}>
                        <View style={styles.row}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                Room:{" "}
                            </Text>
                            <Text
                                style={{ fontSize: 20, fontFamily: FONT.bold }}
                            >
                                {item.codeRoom}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                Service
                            </Text>
                            <Text
                                style={{ fontSize: 20, fontFamily: FONT.bold }}
                            >
                                {item.service}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                Quantity
                            </Text>
                            <Text
                                style={{ fontSize: 20, fontFamily: FONT.bold }}
                            >
                                {item.quantity}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <Text style={{ fontSize: 20, fontFamily: FONT.medium }}>
                            Hanh Khach
                        </Text>
                        <Text style={styles.passenger}>
                            {item.namePassenger}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                NGAY
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.date}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                CHECKIN
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.checkin}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                CHECKOUT
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.checkout}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                REQUEST
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                -----
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                SSR CODE
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                CBFS
                            </Text>
                        </View>
                    </View>
                    <View style={styles.attention}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: FONT.regular,
                                width: "80%",
                                textAlign: "center",
                            }}
                        >
                            Lưu ý: Nếu có bất kì thắc mắc hay cần sự trợ giúp,
                            Hãy liên hệ với bộ phận chăm sóc khách hàng của
                            chúng tôi qua số điện thoại 19001900
                        </Text>
                    </View>
                    <View style={styles.straight}></View>
                </View>
                <View style={styles.footer}>
                    {!concatenatedString ? (
                        <Image
                            style={styles.SearchResultImage}
                            source={{
                                uri: "https://qrcode-gen.com/images/qrcode-default.png",
                            }}
                        />
                    ) : (
                        <View style={styles.SearchResultImage}>
                            <QRCode
                                value={concatenatedString}
                                size={200} // Kích thước của mã QR
                            />
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            "Confirm Delete",
                            "Are you sure you want to delete this comment?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "Delete",
                                    onPress: () => handleCancel(id)
                                }
                            ]
                        );
                    }}
                >
                    <Text style={styles.buttonText}>Hủy Phòng</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default DetailTicket;

const styles = StyleSheet.create({
    detailTicket: {
        backgroundColor: COLORS.white,
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center"
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 30,
        paddingVertical: 6,
    },
    firm: {
        fontSize: 30,
        fontFamily: FONT.bold,
    },
    body: {
        paddingHorizontal: 30,
    },
    journey: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingVertical: 20,
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        fontFamily: FONT.regular,
    },
    short: {
        fontSize: 32,
        fontFamily: FONT.bold,
    },
    planeIcon: {
        width: 28,
        height: 28,
    },
    detail: {
        marginBottom: 20,
    },
    passenger: {
        fontSize: 20,
        fontFamily: FONT.bold,
    },
    row: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    attention: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    straight: {
        height: 2,
        backgroundColor: COLORS.gray,
        marginHorizontal: -30,
    },
    footer: {
        alignContent: "center",
    },
    SearchResultImage: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },

    button: {
        width: "50%",
        height: 50,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center'
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONT.bold,
        textAlign: 'center',
    },
});
