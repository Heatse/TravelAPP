import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import List from "../../../components/listResult/list";
import { COLORS, FONT } from "../../../constants/theme";
import { RoomService } from "../../../service/roomService";
import { LocationService } from "../../../service/locationService";

const ListResult = () => {
    const { search } = useLocalSearchParams();
    const [locationSearch, setLocationSearch] = useState("");
    const [roomSearch, setRoomSearch] = useState("");

    const roomService = new RoomService();
    const locationService = new LocationService();

    useEffect(() => {
        (async () => {
            const res = await roomService.findByKeyAccName(search);
            if (res) {
                setRoomSearch(res);
            }
        })();
    }, [search]);

    useEffect(() => {
        (async () => {
            const res = await locationService.findByKeyName(search);
            if (res) {
                setLocationSearch(res);
            }
        })();
    }, [search]);

    return (
        <View style={styles.listResult}>
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
            <View>
                {locationSearch ? (
                    <FlatList
                        data={locationSearch}
                        renderItem={({ item }) => <List item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={false}
                        pagingEnabled
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}
                    />
                ) : (
                    <Text>Không tìm thấy kết quả</Text>
                )}
                {/* <FlatList
                    data={slides}
                    renderItem={({ item }) => <List item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={false}
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                /> */}
            </View>
        </View>
    );
};

export default ListResult;

const slides = [
    {
        url: require("../../../assets/images/vanMieu.png"),
        text1: "Văn Miếu Quốc Tử Giám",
        location: "HaNoi, VietNam",
    },
    {
        url: require("../../../assets/images/list_1.png"),
        text1: "Burj Al Arab",
        text2: "$ 9.999.999",
    },
    {
        url: require("../../../assets/images/vanMieu.png"),
        text1: "Văn Miếu Quốc",
        location: "HaNoi, VietNam",
    },
    {
        url: require("../../../assets/images/list_1.png"),
        text1: "Burj Al Arab",
        text2: "$ 9.999.999",
    },
    {
        url: require("../../../assets/images/vanMieu.png"),
        text1: "Văn Miếu Quốc",
        location: "HaNoi, VietNam",
    },
    {
        url: require("../../../assets/images/list_1.png"),
        text1: "Burj Al Arab",
        text2: "$ 9.999.999",
    },
];

const styles = StyleSheet.create({
    listResult: {
        alignItems: "center",
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: COLORS.white,
    },
});
