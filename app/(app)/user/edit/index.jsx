import { Stack } from "expo-router";
import {
    Button,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT } from "../../../../constants/theme";
import Avatar from "../../../../components/ui/avatar";
import icons from "../../../../constants/icons";
import Item from "../../../../components/user/edit/item";
import { useEffect, useState } from "react";
import BoxHandleImage from "../../../../components/user/edit/boxImage";
import { UserService } from "../../../../service/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({});
    const [list, setList] = useState([]);

    const handleChoosePhoto = () => {
        setModalVisible(false);
    };

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

    useEffect(() => {
        const updatedList = [
            {
                original: "firstName",
                field: "First Name",
                text: `${userData?.firstName}` || "Chưa cập nhật",
            },
            {
                original: "lastName",
                field: "Last Name",
                text: `${userData?.lastName}` || "Chưa cập nhật",
            },
            {
                original: "email",
                field: "Email",
                text: userData?.email || "Chưa cập nhật",
            },
            {
                original: "phoneNumber",
                field: "Phone",
                text: userData?.phoneNumber || "Chưa cập nhật",
            },
            {
                original: "dob",
                field: "Date of Birth",
                text: userData?.dob || "Chưa cập nhật",
            },
            {
                original: "address",
                field: "Address",
                text: userData?.address || "Chưa cập nhật",
            },
        ];
        setList(updatedList);
    }, [userData]);

    return (
        <View style={styles.editPage}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "rgb(242,242,242)" },
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                }}
            />
            <Text style={styles.edit}>Edit Profile</Text>
            <View style={styles.wrapAvatar}>
                <Avatar
                    imageBase64={userData?.urlAvt || image}
                    style={styles.avatar}
                />
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.wrapCam}
                >
                    <Image source={icons.camera} style={styles.iconCamera} />
                </TouchableOpacity>
            </View>
            {list.map((item, index) => (
                <Item
                    original={item.original}
                    key={index}
                    field={item.field}
                    text={item.text}
                    list={list}
                    setList={setList}
                    index={index}
                />
            ))}

            <BoxHandleImage
                setUserData={setUserData}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleChoosePhoto={handleChoosePhoto}
            />
        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    editPage: {
        paddingHorizontal: 30,
    },
    edit: {
        fontSize: 30,
        fontFamily: FONT.bold,
    },
    wrapAvatar: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 24,
        position: "relative",
    },
    wrapCam: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 24,
        right: "36%",
    },
    iconCamera: {
        width: 20,
        height: 20,
    },
});

const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
