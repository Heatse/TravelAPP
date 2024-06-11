import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../../../components/ui/button";
import icons from "../../../constants/icons";
import Item from "../../../components/shedule/item";
import { COLORS, FONT, SHADOWS } from "../../../constants/theme";
import NavBar from "../../../components/navigation";
import { ScheduleService } from "../../../service/scheduleService";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const Schedule = () => {
    const { id } = useLocalSearchParams();
    const [schedules, setSchedules] = useState([]);
    const [action, setAction] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const router = useRouter();
    const showToast = (isTrue) => {
        isTrue
            ? Toast.show({
                  type: "success",
                  text1: "Thông báo",
                  text2: "Bạn đã lên lịch thành công 👋",
              })
            : Toast.show({
                  type: "error",
                  text1: "Thông báo",
                  text2: "Hãy thử lại khi khác nhé 😥",
              });
    };

    const scheduleService = new ScheduleService();

    const fetchSchedules = async () => {
        try {
            const res = await scheduleService.getListScheduleById(id);
            if (res) {
                setSchedules(res.reverse());
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to fetch schedules.");
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const createSchedule = () => {
        const data = {
            des: action,
            start: from,
            end: to,
        };
        if (!data.des || !data.start || !data.end) {
            alert("Please fill all fields");
            return;
        } else {
            const res = scheduleService.createScheduleDetail(id, data);
            if (res) {
                setSchedules([data, ...schedules]);
                showToast(true);
                setAction("");
                setFrom("");
                setTo("");
            } else {
                showToast(false);
            }
        }
    };

    const deleteAll = async () => {
        const res = await scheduleService.deleteSchedule(id);
        if (res) {
            setSchedules([]);
            showToast(true);
            router.push("/schedule/list");
        } else {
            showToast(false);
        }
    };

    return (
        <View style={styles.schedulePage}>
            <Stack.Screen
                options={{
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 30,
                        fontFamily: FONT.bold,
                    },
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push("share");
                            }}
                        >
                            <Image source={icons.share} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: FONT.semibold,
                    color: COLORS.gray3,
                    textAlign: "center",
                }}
            >
                {" "}
                Manage Your Time
            </Text>
            <View style={styles.wrapForm}>
                <View style={styles.wrapAction}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="Type your action"
                        onChangeText={(text) => setAction(text)}
                        value={action}
                    />
                </View>
                <View style={styles.wrapJour}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="From"
                        onChangeText={(text) => setFrom(text)}
                        value={from}
                    />
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="To"
                        onChangeText={(text) => setTo(text)}
                        value={to}
                    />
                </View>
                <View style={styles.wrapButton}>
                    {/* <TouchableOpacity>
                        <Image
                            source={icons.upload}
                            style={styles.uploadIcon}
                        />
                    </TouchableOpacity> */}
                    <Button onPress={createSchedule}>Add</Button>
                </View>
            </View>
            <View>
                <View style={styles.schedules}>
                    {schedules.length < 0 ? (
                        <Text>No schedule</Text>
                    ) : (
                        <FlatList
                            data={schedules}
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
                                        backgroundColor: "white",
                                        paddingHorizontal: 10,
                                    }}
                                    item={item}
                                    setSchedules={setSchedules}
                                    schedules={schedules}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </View>
            <View style={styles.footer}>
                <Button onPress={deleteAll} style={styles.buttonDelete}>
                    Delete Schedule
                </Button>
            </View>
            <NavBar activePage="" style={styles.navbar} />
        </View>
    );
};

export default Schedule;

const styles = StyleSheet.create({
    schedulePage: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapForm: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    wrapAction: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        marginBottom: 10,
    },
    inputStyle: {
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        ...SHADOWS.all,
    },
    wrapJour: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        gap: 12,
    },
    wrapButton: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        gap: 12,
    },
    schedules: {
        marginHorizontal: 20,
        marginBottom: 20,
        height: height * 0.45,
    },
    footer: {
        height: 50,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    buttonDelete: {
        width: 200,
    },
    navbar: {
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        width: "100%",
        backgroundColor: COLORS.white,
    },
});

const notifications = [
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
    {
        title: "Reminder schedule checkin",
        detail: "You have successfully booked your room.",
        time: "10:00 AM",
    },
];
