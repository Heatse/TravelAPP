import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { COLORS, FONT } from "../../../../constants/theme";
import Button from "../../../../components/ui/button";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { VehicleService } from "../../../../service/vehicleService";

const image = require("../../../../assets/images/order.png");

const Select = () => {
    const { id } = useLocalSearchParams();
    const [vehicle, setVehicle] = useState({});
    const [bookedSeats, setBookedSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const vehicleService = new VehicleService();
        (async () => {
            try {
                setIsLoading(true);
                const response = await vehicleService.getVehicleById(id);
                setVehicle(response.vehicle);
                setBookedSeats(response.bookedSeats);
                setIsLoading(false);
            } catch (error) {
                Alert.alert("Error", error.message);
            }
        })();
    }, []);

    const [seats, setSeats] = useState(
        Array.from({ length: vehicle.seatTotal }, (_, index) => ({
            id: index + 1,
            status: "empty",
        }))
    );

    useEffect(() => {
        if (vehicle.seatTotal) {
            setSeats(
                Array.from({ length: vehicle.seatTotal }, (_, index) => ({
                    id: index + 1,
                    status: bookedSeats.includes(index + 1)
                        ? "bought"
                        : "empty",
                }))
            );
        }
    }, [bookedSeats, vehicle]);

    const toggleSeatStatus = (id) => {
        const updatedSeats = seats.map((seat) => ({
            ...seat,
            status:
                seat.id === id && seat.status === "empty"
                    ? "selected"
                    : seat.id === id && seat.status === "selected"
                        ? "empty"
                        : seat.status === "selected"
                            ? "empty"
                            : seat.status,
        }));
        setSeats(updatedSeats);
    };

    const countSelectedSeats = () => {
        return seats.filter((seat) => seat.status === "selected").length;
    };

    const calculatePrice = () => {
        return countSelectedSeats() * Number(vehicle?.price);
    };

    const onBooking = () => {
        sendBookingToServer();
    };

    const sendBookingToServer = async () => {
        const vehicleService = new VehicleService();
        const data = {
            vehicleId: id,
            seatNumber: seats
                .filter((seat) => seat.status === "selected")
                .map((seat) => seat.id)
                .toString(),
        };
        try {
            const response = await vehicleService.bookVehicle(data);
            console.log(response)
            if (response) {
                router.push(`/bookvehicle/success/${response.id}`);
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const renderSeat = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.seat,
                {
                    backgroundColor:
                        item.status === "empty"
                            ? COLORS.black
                            : item.status === "selected"
                                ? "transparent"
                                : "red",
                    borderColor:
                        item.status === "selected"
                            ? COLORS.white
                            : "transparent",
                    borderWidth: item.status === "selected" ? 1 : 0,
                },
            ]}
            onPress={() => toggleSeatStatus(item.id)}
            disabled={item.status === "bought"}
        >
            <Text style={[styles.seatText]}>{item.id}</Text>
        </TouchableOpacity>
    );

    const numColumns = Math.floor(Dimensions.get("window").width / 55);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }
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
                        color: COLORS.white,
                    },
                    headerTitleAlign: "center",
                    headerTintColor: COLORS.white,
                }}
            />
            <ImageBackground
                style={styles.bg}
                resizeMode="cover"
                source={{ uri: vehicle?.image } || image}
            >
                <View style={styles.listSeat}>
                    <FlatList
                        data={seats}
                        renderItem={renderSeat}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={numColumns}
                        contentContainerStyle={styles.seatContainer}
                    />
                    <View style={styles.legendContainer}>
                        <Text
                            style={[
                                styles.legendText,
                                { backgroundColor: COLORS.black2 },
                            ]}
                        >
                            Empty
                        </Text>
                        <Text
                            style={[
                                styles.legendText,
                                { backgroundColor: "red" },
                            ]}
                        >
                            Bought
                        </Text>
                        <Text
                            style={[
                                styles.legendText,
                                {
                                    backgroundColor: "transparent",
                                    borderColor: COLORS.white,
                                    borderWidth: 1,
                                },
                            ]}
                        >
                            Selected
                        </Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.leftBox}>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 30,
                                fontFamily: FONT.bold,
                                color: COLORS.white,
                            }}
                        >
                            {vehicle?.brand}
                        </Text>
                        <View style={{ gap: 8, marginTop: 20 }}>
                            <Text
                                style={{
                                    fontFamily: FONT.regular,
                                    fontSize: 9,
                                    color: COLORS.white,
                                }}
                            >
                                📍 {vehicle?.destination} -{" "}
                                {vehicle.startingLocation}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                {vehicle &&
                                    (() => {
                                        const stars = [];
                                        for (
                                            let i = 0;
                                            i < vehicle.rating;
                                            i++
                                        ) {
                                            stars.push(<Text key={i}>⭐</Text>);
                                        }
                                        return stars;
                                    })()}
                            </View>
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
                            {calculatePrice()?.toLocaleString() || "0"} đ
                        </Text>
                        <View
                            style={{
                                flexDirection: "column",
                                gap: 12,
                                alignItems: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: FONT.medium,
                                    color: COLORS.white,
                                    marginBottom: -16,
                                }}
                            >
                                Date: {vehicle?.movingDate}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONT.regular,
                                    fontSize: 9,
                                    color: COLORS.white,
                                }}
                            >
                                #{generateInitials(vehicle)}
                            </Text>
                        </View>
                        <Button
                            disabled={1 > countSelectedSeats()}
                            onPress={onBooking}
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

export default Select;

const styles = StyleSheet.create({
    selectPage: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    bg: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    listSeat: {
        height: "70%",
        alignItems: "center",
    },
    seatContainer: {
        marginTop: 10,
    },
    seat: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
    },
    seatText: {
        color: COLORS.white,
        fontFamily: FONT.medium,
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
        width: "45%",
        gap: 8,
    },
    rightBox: {
        width: "55%",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    button: {
        width: 120,
        marginTop: 14,
    },
    legendContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-around",
        marginVertical: 10,
    },
    legendText: {
        padding: 5,
        borderRadius: 5,
        color: COLORS.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
