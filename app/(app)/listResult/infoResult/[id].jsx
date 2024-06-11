import React, { useEffect, useReducer, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Info from "../../../../components/listResult/info";
import Pagination from "../../../../components/pagination";
import { COLORS, FONT } from "../../../../constants/theme";
import icons from "../../../../constants/icons";
import Button from "../../../../components/ui/button";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { LocationService } from "../../../../service/locationService";
import axios from "axios";
import { RoomService } from "../../../../service/roomService";
import Item from "../../../../components/listResult/item";
import { ScheduleService } from "../../../../service/scheduleService";
import { set } from "lodash";
import Weather from "../../../../components/listResult/weather";

const { width, height } = Dimensions.get("screen");

const InfoResult = () => {
    const { id } = useLocalSearchParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [showFullText, setShowFullText] = useState(3);
    const [location, setLocation] = useState({});
    const [rating, setRating] = useState(5);
    const [totalComment, setTotalComment] = useState(0);
    const [weather, setWeather] = useState();
    const [listRoom, setListRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const roomService = new RoomService();
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await roomService.getRoomByProvinId(
                    location?.provin?.id || 1
                );
                setListRoom(res);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log(e);
            }
        })();
    }, [location]);

    const handleReadMore = () => {
        setShowFullText(100);
    };

    const handleScroll = (event) => {
        let contentOffset = event.nativeEvent.contentOffset.x;
        if (contentOffset < 0) {
            contentOffset = 0;
        }
        const index = Math.round(contentOffset / width);
        setActiveIndex(index);
    };

    const locationService = new LocationService();
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await locationService.getLocationById(id);
                setLocation(res);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await locationService.getRatingLocation(id);
                setRating(res);
                if (res === 0) setRating(5);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await locationService.getTotalCommentByLocationId(
                    id
                );
                setTotalComment(res);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    {
                        params: {
                            lat: location?.provin?.latitude,
                            lon: location?.provin?.longitude,
                            appid: "ad235dc6d814c748566f36fa69af61fb",
                        },
                    }
                );
                setWeather(response.data);
                setIsLoading(false);
                return response.data;
            } catch (error) {
                setIsLoading(false);
                // console.error("Error fetching weather data:", error);
                // throw error;
            }
        })();
    }, [location]);

    const handleClickSchedule = async () => {
        const scheduleService = new ScheduleService();
        try {
            const response = await scheduleService.createSchedule(id);
            if (response.status === "create") {
                router.push(`/schedule/${response.id}`);
            } else if (response.status === "get") {
                router.push(`/schedule/${response.scheduleId}`);
            } else
                Alert.alert(
                    "Error",
                    "Create schedule failed, Check your network"
                );
        } catch (error) {
            Alert.alert("Error", "Create schedule failed, Check your network");
        }
    };

    const handleClickBookRoom = () => {
        router.push("/hotel");
    };

    const handleClickBookVehicle = () => {
        router.push("/bookvehicle");
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }
    return (
        <View style={styles.page}>
            <FlatList
                data={[
                    { key: "main", component: "main" },
                    ...image,
                    ...slides4,
                ]}
                renderItem={({ item }) => {
                    if (item.component === "main") {
                        return (
                            <View>
                                <View style={{ position: "relative" }}>
                                    <FlatList
                                        data={location.images || image}
                                        renderItem={({ item }, index) => (
                                            <Info key={index} item={item} />
                                        )}
                                        keyExtractor={(item, index) =>
                                            index.toString() || 100
                                        }
                                        horizontal
                                        pagingEnabled
                                        snapToAlignment="center"
                                        showsHorizontalScrollIndicator={false}
                                        onScroll={
                                            location?.images?.length > 1 &&
                                            handleScroll
                                        }
                                        initialScrollIndex={activeIndex}
                                        getItemLayout={(data, index) => ({
                                            length: width,
                                            offset: width * index,
                                            index,
                                        })}
                                    />
                                    <Pagination
                                        data={location.images || image}
                                        activeIndex={activeIndex}
                                        style={styles.pagination}
                                    />
                                </View>
                                <View style={styles.text}>
                                    <Text style={styles.text1}>
                                        {location?.name ||
                                            "Văn Miếu - Quốc Tử Giám"}
                                    </Text>
                                    <View style={styles.row}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 4,
                                            }}
                                        >
                                            {Array.from({ length: rating }).map(
                                                (_, index) => (
                                                    <Image
                                                        source={icons.star2}
                                                    />
                                                )
                                            )}
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                router.push(
                                                    `listResult/reviewLocation/${location?.id}`
                                                );
                                            }}
                                        >
                                            <Text>{totalComment} đánh giá</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.text2}>
                                            📍
                                            {location?.provin?.name ||
                                                "Hà Nội, Việt Nam"}
                                        </Text>

                                        <TouchableOpacity
                                            setModalVisible={setModalVisible}
                                            weather={weather}
                                            modalVisible={modalVisible}
                                            onPress={() => {
                                                setModalVisible(true);
                                            }}
                                        >
                                            <Text>
                                                ☁️{" "}
                                                {Math.round(
                                                    weather?.main?.temp -
                                                        273.15,
                                                    2
                                                ) || 0}{" "}
                                                °C
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text
                                        numberOfLines={showFullText}
                                        style={styles.text3}
                                    >
                                        {location.description ||
                                            ` 
                                            Văn Miếu – Quốc Tử Giám là quần thể di
                                            tích đa dạng, phong phú hàng đầu của
                                            thành phố Hà Nội, nằm ở phía Nam kinh
                                            thành Thăng Long. Quần thể kiến trúc Văn
                                            Miếu – Quốc Tử Giám bao gồm: hồ Văn, khu
                                            Văn Miếu – Quốc Tử Giám và vườn Giám, mà
                                            kiến trúc chủ thể là Văn miếu (chữ Hán:
                                            文廟) - nơi thờ Khổng Tử, và Quốc tử
                                            giám (chữ Hán: 國子監) - trường đại học
                                            đầu tiên của Việt Nam. Khu Văn Miếu –
                                            Quốc Tử Giám có tường gạch vồ bao quanh,
                                            phía trong chia thành 5 lớp không gian
                                            với các kiến trúc khác nhau"`}
                                    </Text>
                                    <View>
                                        {showFullText < 4 && (
                                            <TouchableOpacity
                                                onPress={handleReadMore}
                                            >
                                                <Text style={styles.readMore}>
                                                    Read more
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.bt}>
                                    <Button
                                        style={styles.button}
                                        variant="secondary"
                                        onPress={handleClickSchedule}
                                    >
                                        Schedule
                                    </Button>
                                    <Button
                                        style={styles.button}
                                        variant="primary"
                                        onPress={handleClickBookRoom}
                                    >
                                        Book Rooms
                                    </Button>
                                    <Button
                                        style={styles.button}
                                        variant="outline"
                                        onPress={handleClickBookVehicle}
                                    >
                                        Book Vehicle
                                    </Button>
                                </View>

                                <View style={styles.flat} />
                                <View style={styles.container}>
                                    <Text style={styles.text4}>Best Deals</Text>

                                    {listRoom.length > 0 ? (
                                        <View
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            <FlatList
                                                data={listRoom}
                                                renderItem={(
                                                    { item },
                                                    index
                                                ) => (
                                                    <Item
                                                        key={index}
                                                        item={item}
                                                    />
                                                )}
                                                keyExtractor={(item) =>
                                                    item?.id?.toString() || 1
                                                }
                                                horizontal={false}
                                                pagingEnabled
                                                snapToAlignment="center"
                                                showsHorizontalScrollIndicator={
                                                    false
                                                }
                                            />
                                        </View>
                                    ) : (
                                        <Text
                                            style={{
                                                width: "100%",
                                                textAlign: "center",
                                                fontFamily: FONT.regular,
                                                fontSize: 16,
                                            }}
                                        >
                                            No room nearby
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    } else {
                        return item.component;
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
                horizontal={false} // Set this to true if you want the outer list to be horizontal
                pagingEnabled={false}
                showsVerticalScrollIndicator={false}
            />
            {weather && (
                <Weather
                    setModalVisible={setModalVisible}
                    weather={weather}
                    modalVisible={modalVisible}
                />
            )}
        </View>
    );
};

export default InfoResult;

const image = [
    `${require("../../../../assets/images/vanMieu.png")}`,
    `${require("../../../../assets/images/vanMieu.png")}`,
    `${require("../../../../assets/images/vanMieu.png")}`,
    `${require("../../../../assets/images/vanMieu.png")}`,
];

const slides4 = [
    {
        url: require("../../../../assets/images/home_3.png"),
        text1: "Hotel Burj Al Arab",
        text2: "Dubai - Uni Emirat Arab",
        text3: "(999mm) Umm Suqeim 3",
        text4: "$ 9.999.999",
        text5: "Per Night",
    },
    {
        url: require("../../../../assets/images/home_3.png"),
        text1: "Hotel Burj Al Arab",
        text2: "Dubai - Uni Emirat Arab",
        text3: "(999mm) Umm Suqeim 3",
        text4: "$ 9.999.999",
        text5: "Per Night",
    },
];

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    text: {
        left: 10,
        right: 20,
        paddingRight: 15,
        marginHorizontal: 20,
        gap: 8,
    },
    text1: {
        fontSize: 22,
        color: COLORS.black,
        fontFamily: FONT.bold,
    },
    text2: {
        fontSize: 16,
        fontFamily: FONT.regular,
    },
    text3: {
        fontSize: 14,
        fontFamily: FONT.regular,
        textAlign: "justify",
    },

    text4: {
        fontSize: 20,
        fontFamily: FONT.bold,
        color: COLORS.black,
        margin: 22,
    },

    bt: {
        flexDirection: "row",
        gap: 12,
        marginHorizontal: 20,
    },

    button: {
        borderRadius: 20,
        flex: 1,
    },

    pagination: {
        top: 0,
    },

    flat: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    readMore: {
        color: COLORS.primary,
        fontFamily: FONT.bold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
