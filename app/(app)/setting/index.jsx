import { StyleSheet, Text, View } from "react-native";
import Item from "../../../components/user/item";
import icons from "../../../constants/icons";
import { FONT } from "../../../constants/theme";
import { Stack } from "expo-router";

const Setting = () => {
    return (
        <View style={styles.setting}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "rgb(242,242,242)" },
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                }}
            />
            <Text style={styles.text}>Setting</Text>
            <View style={styles.bodyList}>
                {list.map((item, index) => (
                    <Item
                        key={index}
                        icon={item.icon}
                        text={item.text}
                        href={item.href}
                        text2={item.text2}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: FONT.bold,
        padding: 30,
        textAlign: "left",
    },
    bodyList: {
        padding: 30,
    },
    navbar: {
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        width: "100%",
    },
});

export default Setting;

const list = [
    {
        text: "Notificaton",
        icon: icons.bell,
        href: "/setting/notificaton",
    },
    {
        text: "Country",
        text2: "Vietnamese",
        href: "/setting/country",
    },
    {
        text: "Currency",
        icon: icons.ticket,
        href: "/setting/currency",
    },
    {
        text: "Term of Service",
        icon: icons.chevronRight,
        href: "/setting/term",
    },
    {
        text: "Give Feedback",
        icon: icons.chevronRight,
        href: "/setting/feedback",
    },
    {
        text: "Log out",
        icon: icons.chevronRight,
        href: "/auth/login",
    },
];
