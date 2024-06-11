import React, { useState } from "react";
import { Link, Stack, router } from "expo-router";
import icons from "../../../../constants/icons";
import {
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Button from "../../../../components/ui/button";
import { TouchableOpacity } from "react-native";
import { COLORS, FONT, SHADOWS } from "../../../../constants/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserService } from "../../../../service/userService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");
const Login = () => {
    const [showPassword, setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const showToast = (isTrue) => {
        isTrue
            ? Toast.show({
                  type: "success",
                  text1: "Thông báo",
                  text2: "Đăng nhập thành công 👋",
              })
            : Toast.show({
                  type: "error",
                  text1: "Thông báo",
                  text2: "Đăng nhập thất bại 😥",
              });
    };

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid Email")
            .required("Please enter your email."),
        password: Yup.string()
            .min(8)
            .required("Please enter your password.")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            ),
    });
    const onSubmit = (values) => {
        onLogin(values);
    };

    const userService = new UserService();
    const onLogin = async (data) => {
        try {
            const response = await userService.login(data);
            await AsyncStorage.setItem("cookies", response.jwt);
            await AsyncStorage.setItem("userId", response.id.toString());
            showToast(true);
            setTimeout(() => {
                router.push("/home");
            }, 200);
        } catch (error) {
            showToast(false);
            console.log(error);
        }
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => onSubmit(values)}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                setFieldTouched,
                isValid,
                handleSubmit,
            }) => (
                <View style={styles.loginPage} behavior="padding">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Stack.Screen
                            options={{
                                headerStyle: {
                                    backgroundColor: "rgb(242,242,242)",
                                },
                                headerTintColor: "#000",
                                headerShadowVisible: false,
                            }}
                        />
                        <View style={styles.loginForm}>
                            <Text style={styles.titleForm}>Login</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    textDecorationLine="none"
                                    placeholderTextColor={"gray"}
                                    style={styles.inputStyle}
                                    placeholder="Email"
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={() => setFieldTouched("email")}
                                />
                            </View>
                            {touched.email && errors.email ? (
                                <Text style={styles.textError}>
                                    {errors.email}
                                </Text>
                            ) : null}
                            <View style={styles.inputWrap}>
                                <TextInput
                                    secureTextEntry={showPassword}
                                    placeholderTextColor={"gray"}
                                    style={styles.inputStyle}
                                    placeholder="Password"
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={() => setFieldTouched("password")}
                                />

                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    style={styles.eye}
                                >
                                    <Image
                                        source={
                                            showPassword
                                                ? icons.eye
                                                : icons.eyeActive
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            {touched.password && errors.password ? (
                                <Text style={styles.textError}>
                                    {errors.password}
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                onPress={() => {}}
                                style={styles.forgotPassword}
                            >
                                <TouchableOpacity
                                    onPress={() => router.push("/auth/reset")}
                                    style={{
                                        fontFamily: "Montserrat_Regular",
                                        fontSize: 12,
                                        textAlign: "right",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Montserrat_Regular",
                                            fontSize: 12,
                                            textAlign: "right",
                                        }}
                                    >
                                        Forgot your password ?
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <View style={styles.wrapBtn}>
                                <TouchableOpacity
                                    variant="secondary"
                                    // onPress={onLoginWithGoogle}
                                    style={[styles.button, styles.buttonIm]}
                                >
                                    <Image
                                        source={icons.ggIcon}
                                        style={styles.iconBuilding}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: "Montserrat_SemiBold",
                                            fontSize: 14,
                                        }}
                                    >
                                        Google
                                    </Text>
                                </TouchableOpacity>
                                <Button
                                    variant="primary"
                                    onPress={handleSubmit}
                                    style={styles.button}
                                    disabled={!isValid}
                                >
                                    Login
                                </Button>
                            </View>
                        </View>
                        <View style={styles.signupContainer}>
                            <Text>Don't have an account yet ?</Text>
                            <Link style={styles.linK} href="/auth/sign-up">
                                Signup
                            </Link>
                        </View>
                    </ScrollView>
                </View>
            )}
        </Formik>
    );
};

export default Login;

const styles = StyleSheet.create({
    loginPage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    loginForm: {
        height: height * 0.7,
        padding: 10,
        marginTop: 100,
        width: width * 0.9,
    },
    titleForm: {
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Montserrat_Bold",
        marginBottom: 40,
    },
    inputWrap: {
        maxWidth: 400,
        maxHeight: 50,
        width: "100%",
        height: "100%",
        borderRadius: 30,
        marginBottom: 10,
    },
    inputStyle: {
        flex: 1,
        borderRadius: 30,
        textAlign: "center",
        backgroundColor: COLORS.white,
        ...SHADOWS.all,
    },
    forgotPassword: {
        textAlign: "right",
        fontSize: 12,
        fontFamily: "Montserrat_Light",
    },
    wrapBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        marginTop: 32,
    },
    button: {
        height: 50,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        flexDirection: "row",
        ...SHADOWS.all,
    },
    signupContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 24,
    },
    iconBuilding: {
        width: 33,
        height: 33,
        marginRight: 8,
    },
    buttonIm: {
        backgroundColor: COLORS.secondary,
        color: COLORS.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    linK: {
        color: COLORS.primary,
        fontFamily: FONT.semibold,
    },
    eye: {
        position: "absolute",
        right: 12,
        top: 14,
    },
    textError: {
        marginTop: -10,
        marginBottom: 10,
        paddingLeft: 12,
        fontFamily: "Montserrat_MediuItalic",
        fontSize: 12,
        color: COLORS.error,
    },
});
