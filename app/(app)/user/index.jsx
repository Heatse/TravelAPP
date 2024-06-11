import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../../components/ui/avatar";
import icons from "../../../constants/icons";
import Item from "../../../components/user/item";
import { FONT } from "../../../constants/theme";
import NavBar from "../../../components/navigation";
import { router } from "expo-router";
import { UserService } from "../../../service/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const User = () => {
    const [userData, setUserData] = useState({});
    const handleRouterEdit = () => {
        router.push("/user/edit");
    };
    // getUser
    useEffect(() => {
        const userService = new UserService();
        (async () => {
            try {
                const id = await AsyncStorage.getItem("userId");
                const response = await userService.getUserById(id);
                setUserData(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <View style={styles.profile}>
            <TouchableOpacity onPress={handleRouterEdit} style={styles.header}>
                <View style={styles.wrapText}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {userData?.firstName + userData?.lastName || "No Name"}
                    </Text>
                    <Text style={styles.text}>View and edit your profile</Text>
                </View>
                <Avatar
                    imageBase64={userData?.urlAvt ?? image}
                    style={styles.avatar}
                />
            </TouchableOpacity>
            <View style={styles.bodyList}>
                {list.map((item, index) => (
                    <Item
                        key={index}
                        icon={item.icon}
                        text={item.text}
                        href={item.href}
                    />
                ))}
            </View>
            <NavBar activePage="user" style={styles.navbar} />
        </View>
    );
};

export default User;

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        alignItems: "center",
    },
    wrapText: {
        width: "70%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 30,
        justifyContent: "space-between",
        width: "100%",
    },
    name: {
        fontSize: 30,
        fontFamily: FONT.bold,
    },
    text: {
        fontSize: 16,
        fontFamily: FONT.regular,
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

const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

const list = [
    {
        text: "Change Password",
        icon: icons.lock,
        href: "user/changePassword",
    },
    {
        text: "History Booking",
        icon: icons.call,
        href: "user/roomHistory",
    },
    {
        text: "Ticket History",
        icon: icons.ticket,
        href: "user/ticketHistory",
    },
    {
        text: "AI Schedule",
        icon: icons.ai,
        href: "ai",
    },
    {
        text: "Help Center",
        icon: icons.help,
        href: "user/help",
    },
    {
        text: "Schedules",
        icon: icons.schedule,
        href: "/schedule/list",
    },
    {
        text: "Setting",
        icon: icons.setting,
        href: "/setting",
    },
];
