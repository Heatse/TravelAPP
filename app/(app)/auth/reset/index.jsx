import { head } from "lodash";
import { Alert, Image, StyleSheet, TextInput, View } from "react-native";
import Button from "../../../../components/ui/button";
import { Stack, router } from "expo-router";
import { COLORS, FONT } from "../../../../constants/theme";
import icons from "../../../../constants/icons";
import { UserService } from "../../../../service/userService";
import { useState } from "react";
import Toast from "react-native-toast-message";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const userService = new UserService();

    const showToast = (isTrue) => {
        isTrue
            ? Toast.show({
                  type: "success",
                  text1: "Thông báo",
                  text2: "Password reset success. Check your email 👋",
              })
            : Toast.show({
                  type: "error",
                  text1: "Thông báo",
                  text2: "Email not found 😥",
              });
    };

    const onReset = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }
        try {
            console.log(email);
            const response = await userService.resetPassword(email);
            showToast(true);
            router.push("/auth/login");
        } catch (error) {
            showToast(false);
            console.log("error", error);
        }
    };
    return (
        <View style={styles.resetPage}>
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
                }}
            />
            <View style={styles.container}>
                <Image style={styles.image} source={icons.resetpass} />
                <TextInput
                    textDecorationLine="none"
                    placeholderTextColor={"gray"}
                    style={styles.inputStyle}
                    placeholder="Type your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Button onPress={onReset}>Submit</Button>
            </View>
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    resetPage: {
        flex: 1,
        backgroundColor: "rgb(242,242,242)",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputStyle: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});
