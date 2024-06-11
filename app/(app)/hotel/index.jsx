import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router } from "expo-router";
import ListRoom from "../../../components/hotel/listRoom";
import SearchHotel from "../../../components/hotel/search";
import { COLORS, FONT } from "../../../constants/theme";
import icons from "../../../constants/icons";
import FilterModal from "../../../components/hotel/filter";
import { RoomService } from "../../../service/roomService";

const Hotel = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [sort, setSort] = useState(false);
    const [room, setRoom] = useState([]);
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const roomService = new RoomService();

    const onFilter = async () => {
        try {
            setIsLoading(true)
            const response = await roomService.filterRoom(filter);
            setRoom(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFilter();
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [filter]);

    const handleSortTicketsbyPrice = () => {
        if (sort && room.length > 0) {
            room.sort((a, b) => a.price - b.price);
            setSort(false);
        } else {
            room.sort((a, b) => b.price - a.price);
            setSort(true);
        }
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await roomService.getRandomRoom();
            setRoom(response);
            setIsLoading(false);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "rgb(242,242,242)",
                    },
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontFamily: FONT.bold,
                        fontSize: 22,
                    },
                    headerTitleAlign: "center",
                }}
            />
            <View style={styles.searchContainer}>
                <SearchHotel
                    setFilter={setFilter}
                    openFilter={() => setModalVisible(true)}
                />
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <View style={styles.roomContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text1}>Best Deals</Text>
                        <View>
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
                    </View>

                    <FlatList
                        data={room}
                        renderItem={({ item }) => <ListRoom room={room} item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={false}
                        pagingEnabled
                        snapToAlignment="center"
                        showsVerticalScrollIndicator={false}
                    />
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

export default Hotel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 22,
        backgroundColor: COLORS.white,
        paddingBottom: 22,
    },

    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        justifyContent: "space-between",
    },

    text1: {
        fontSize: 16,
        fontFamily: FONT.bold,
    },

    filterIconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    sortIcon: {
        width: 25,
        height: 25,
        marginLeft: 0,
    },

    roomContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    wrapSort: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});
