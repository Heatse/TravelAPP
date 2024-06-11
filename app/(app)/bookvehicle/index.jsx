import { Stack } from "expo-router";
import {
    FlatList,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT } from "../../../constants/theme";
import Search from "../../../components/bookvehicle/search";
import icons from "../../../constants/icons";
import Item from "../../../components/bookvehicle/item";
import { useEffect, useState } from "react";
import FilterModal from "../../../components/bookvehicle/filter";
import { VehicleService } from "../../../service/vehicleService";
import { ActivityIndicator } from "react-native";

const BookingVehicle = () => {
    const image = require("../../../assets/images/bookvehicle_1.png");
    const [sort, setSort] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [listVehicle, setListVehicle] = useState([]);
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const vehicleService = new VehicleService();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await vehicleService.getRandomListVehicle();
            setListVehicle(response);
            setIsLoading(false);
        })();
    }, []);

    const handleSortTicketsbyPrice = () => {
        if (sort && listVehicle.length > 0) {
            listVehicle.sort((a, b) => a.price - b.price);
            setSort(false);
        } else {
            listVehicle.sort((a, b) => b.price - a.price);
            setSort(true);
        }
    };

    const onFilter = async () => {
        try {
            const response = await vehicleService.filterVehicle(filter);
            setListVehicle(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (
            !filter?.brand &&
            Object.keys(filter).every(
                (key) => key === "brand" || filter[key] == null
            )
        ) {
            (async () => {
                setIsLoading(true);
                const response = await vehicleService.getRandomListVehicle();
                setListVehicle(response);
                setIsLoading(false);
            })();
            return;
        }
        const timeoutId = setTimeout(() => {
            onFilter();
        }, 1500);
        return () => clearTimeout(timeoutId);
    }, [filter]);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, flex: 1 }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "rgb(242,242,242)" },
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 22,
                        fontFamily: FONT.bold,
                    },
                    headerTitleAlign: "center",
                }}
            />
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.header}>
                    <Search
                        setFilter={setFilter}
                        openFilter={() => setModalVisible(true)}
                    />
                    {/* <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.button}
                        >
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={icons.search}
                            />
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ImageBackground>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Text style={{ fontSize: 16, fontFamily: FONT.bold }}>
                            Best Tickets
                        </Text>
                        <TouchableOpacity
                            style={styles.wrapSort}
                            onPress={handleSortTicketsbyPrice}
                        >
                            <Text
                                style={{ fontSize: 14, fontFamily: FONT.bold }}
                            >
                                Filter
                            </Text>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={icons.sort}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listTickets}>
                        {listVehicle.length > 0 ? (
                            <FlatList
                                data={listVehicle}
                                renderItem={({ item }) => (
                                    <Item
                                        style={{
                                            shadowColor: "rgb(0, 0, 0)",
                                            shadowOffset: {
                                                width: 3,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 5,
                                            elevation: 2,
                                        }}
                                        item={item}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <View style={{ alignItems: "center" }}>
                                <Image
                                    source={image_noList}
                                    style={{ width: 300, height: 300 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: FONT.bold,
                                        textAlign: "center",
                                    }}
                                >
                                    No tickets available
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            )}
            <FilterModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setFilter={setFilter}
            />
        </View>
    );
};

export default BookingVehicle;

const styles = StyleSheet.create({
    image: {
        paddingTop: 26,
        paddingBottom: 68,
        paddingHorizontal: 30,
        alignItems: "center",
    },
    header: {
        borderRadius: 30,
        backgroundColor: "rgba(255,255,255,0.8)",
        padding: 20,
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
    },
    button: {
        width: 66,
        height: 66,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 99,
        alignContent: "stretch",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    body: {
        paddingHorizontal: 20,
        flex: 1,
    },
    wrapSort: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    listTickets: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

const listTicket = [
    {
        image: require("../../../assets/images/bookvehicleBg.png"),
        brand: "Plane Burj Al Arab",
        destination: "Dubai - Uni Emirat Arab",
        local: "VIE",
        price: "800000",
        rating: 5,
    },
    {
        image: require("../../../assets/images/bookvehicleBg.png"),
        brand: "Plane Burj Al Arab",
        destination: "Dubai - Uni Emirat Arab",
        local: "VIE",
        rating: 5,
        price: "81000000",
    },
    {
        image: require("../../../assets/images/bookvehicleBg.png"),
        brand: "Plane Burj Al Arab",
        destination: "Dubai - Uni Emirat Arab",
        local: "VIE",
        rating: 5,
        price: "5858583000",
    },
    {
        image: require("../../../assets/images/bookvehicleBg.png"),
        brand: "Plane Burj Al Arab",
        destination: "Dubai - Uni Emirat Arab",
        local: "VIE",
        rating: 5,
        price: "80048473",
    },
    {
        image: require("../../../assets/images/bookvehicleBg.png"),
        brand: "Plane Burj Al Arab",
        destination: "Dubai - Uni Emirat Arab",
        local: "VIE",
        rating: 5,
        price: "8546546",
    },
    {
        image: require("../../../assets/images/bookvehicleBg.png"),
        brand: "Plane Burj Al Arab",
        destination: "Dubai - Uni Emirat Arab",
        local: "VIE",
        rating: 5,
        price: "84563456356",
    },
];

const image_noList = require("../../../assets/images/bookingvehicle_0.png");
