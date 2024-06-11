import { Stack } from "expo-router";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT, SHADOWS } from "../../../../constants/theme";
import icons from "../../../../constants/icons";
import { useEffect, useState } from "react";
import { ScheduleService } from "../../../../service/scheduleService";
import ItemList from "../../../../components/shedule/itemList";

const ScheduleList = () => {
    const [listSchedule, setListSchedule] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const scheduleService = new ScheduleService();
                const res = await scheduleService.getListSchedule();
                if (res) {
                    setListSchedule(res);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const onFilter = () => {
        setListSchedule(listSchedule.reverse());
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const onSearchSchedule = debounce(async (text) => {
        const scheduleService = new ScheduleService();
        const response = await scheduleService.findByLocation(text);
        if (response) {
            setListSchedule(response);
        }
    }, 1000);

    return (
        <View style={styles.history}>
            <Stack.Screen
                options={{
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.header}>
                <Text style={styles.ticketHistory}>List Schedule</Text>
                <View style={styles.inputWrap}>
                    <Image source={icons.search} />
                    <TextInput
                        style={styles.inputStyle}
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        placeholder="Search your schedule?"
                        onChangeText={(text) => onSearchSchedule(text)}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyHead}>
                    <Text style={styles.title}>Last schedule</Text>
                    <TouchableOpacity onPress={onFilter}>
                        <Text style={styles.filter}>Filter</Text>
                    </TouchableOpacity>
                </View>
                {listSchedule.length > 0 ? (
                    <FlatList
                        data={listSchedule}
                        renderItem={({ item }) => <ItemList item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.flatList}
                        snapToAlignment="center"
                        columnWrapperStyle={styles.columnWrapper}
                    />
                ) : (
                    <View
                        style={{
                            height: "80%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{}}>No history in here</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default ScheduleList;

const styles = StyleSheet.create({
    history: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        flex: 1,
    },
    header: {
        marginBottom: 20,
    },
    ticketHistory: {
        fontSize: 30,
        fontFamily: FONT.bold,
        marginBottom: 12,
    },
    inputWrap: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
        backgroundColor: COLORS.white,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        ...SHADOWS.all,
    },
    body: {},
    bodyHead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },

    inputStyle: {
        width: "85%",
    },
    title: {
        fontSize: 20,
        fontFamily: FONT.bold,
    },
    filter: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: FONT.regular,
    },
    columnWrapper: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    flatList: {
        paddingBottom: 200,
    },
});

const data = [
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
    {
        image: require("../../../../assets/images/home_1.png"),
        name: "Arab",
        location: "Dubai",
    },
];
