import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SHADOWS } from "../../../constants/theme";
import Item from "../../../components/notification";
import NavBar from "../../../components/navigation";

const Notification = () => {
    return (
        <View style={styles.notification}>
            <Stack.Screen
                options={{
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 30,
                        fontFamily: FONT.bold,
                    },
                    headerTitleAlign: "center",
                }}
            />
            <View style={{ marginBottom: 80 }}>
                <FlatList
                    data={notifications}
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
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <NavBar activePage="notification" style={styles.navbar} />
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    notification: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        alignItems: "center",
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
