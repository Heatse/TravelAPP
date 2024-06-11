import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import icons from "../../../../constants/icons";
import { COLORS, FONT } from "../../../../constants/theme";
import { VehicleService } from "../../../../service/vehicleService";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import Button from "../../../../components/ui/button";
import Toast from "react-native-toast-message";

const DetailTicket = () => {
    const { id } = useLocalSearchParams();
    const [bookingVehicle, setBookingVehicle] = useState();
    const [loading, setLoading] = useState(true);
    const vehicleService = new VehicleService();
    const router = useRouter();

    const item = {
        firm: bookingVehicle?.vehicle.brand,
        departure: bookingVehicle?.vehicle?.startingLocation,
        departureShort: bookingVehicle?.vehicle?.startingLocation
            .slice(0, 3)
            .toUpperCase(),
        destination: bookingVehicle?.vehicle?.destination,
        destinationShort: bookingVehicle?.vehicle?.destination
            .slice(0, 3)
            .toUpperCase(),
        namePassenger:
            bookingVehicle?.user?.firstName +
            ", " +
            bookingVehicle?.user?.lastName,
        date: bookingVehicle?.vehicle.movingDate?.slice(0, 10),
        tripCode: "VJ776",
        code: generateInitials(bookingVehicle?.vehicle) || "---",
        type: bookingVehicle?.vehicle?.vehicleType,
        time: bookingVehicle?.vehicle?.travelTime,
        seat: bookingVehicle?.seatNumber,
    };
    const values = Object.values(item);
    const concatenatedString = values.join(" ");

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await vehicleService.getBookingVehicleById(id);
            setBookingVehicle(response);
            setLoading(false);
        })();
    }, []);

    const onDelete = async () => {
        try {
            const response = await vehicleService.deleteBookingVehicle(id);
            if (response) {
                Toast.show({
                    type: "success",
                    position: "top",
                    text1: "Deleted Booking",
                    text2: response,
                });
            }
            router.push("/user/ticketHistory");
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                position: "top",
                text1: "Error",
                text2: "An error occurred. Please try again later",
            });
        }
    };

    const cancelBooking = () => {
        Alert.alert("Confirm", "Are you sure you want to cancel booking?", [
            {
                text: "No",
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => onDelete(),
            },
        ]);
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

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
                        The Len Phuong Tien
                    </Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.journey}>
                        <View style={styles.wrap}>
                            <Text style={styles.name}>{item.departure}</Text>
                            <Text style={styles.short}>
                                {item.departureShort}
                            </Text>
                        </View>
                        <Image style={styles.planeIcon} source={icons.plane} />
                        <View style={styles.wrap}>
                            <Text style={styles.name}>{item.destination}</Text>
                            <Text style={styles.short}>
                                {item.destinationShort}
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
                                CHUYEN
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.tripCode}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                CODE
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.code.slice(0, 3)}
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
                                TYPE
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.type}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                DURATION
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.time} '
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                GHE
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                {item.seat}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: FONT.medium,
                                }}
                            >
                                SEQ
                            </Text>
                            <Text
                                style={{ fontSize: 16, fontFamily: FONT.bold }}
                            >
                                17
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
                <View style={{ alignItems: "center" }}>
                    <Button
                        onPress={cancelBooking}
                        style={{
                            marginBottom: 12,
                            marginTop: 12,
                            width: "60%",
                            marginVertical: "auto",
                        }}
                        variant="outline"
                    >
                        <Text>Cancel Booking</Text>
                    </Button>
                </View>
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
});

const generateInitials = (vehicle) => {
    if (!vehicle) return "";
    const fields = Object.values(vehicle);
    const initials = fields
        .map((field) => {
            if (field && typeof field === "number") {
                return field.toString();
            }
            return "";
        })
        .join("");

    return initials;
};
