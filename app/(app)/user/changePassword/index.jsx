import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import icons from "../../../../constants/icons";
import Button from "../../../../components/ui/button";
import { Stack } from "expo-router";
import { COLORS, FONT, SHADOWS } from "../../../../constants/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserService } from "../../../../service/userService";
import Toast from "react-native-toast-message";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const showToast = (isTrue) => {
        isTrue
            ? Toast.show({
                  type: "success",
                  text1: "Thông báo",
                  text2: "Cập nhật thông tin thành công 👋",
              })
            : Toast.show({
                  type: "error",
                  text1: "Thông báo",
                  text2: "Cập nhật thất bại 😥",
              });
    };

    const handleChangePassword = (values, { resetForm }) => {
        changePassword(values, { resetForm });
    };

    const changePassword = async (values, { resetForm }) => {
        const userService = new UserService();
        try {
            await userService.changePassword(values);
            showToast(true);
            resetForm();
        } catch (error) {
            showToast(false);
            console.log(error);
        }
    };

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(8)
            .required("Please enter your password.")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            ),
        passwordChange: Yup.string()
            .min(8)
            .required("Please enter your password.")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            )
            .notOneOf(
                [Yup.ref("password")],
                "New password must be different from the old one"
            ),
    });

    return (
        <Formik
            initialValues={{
                password: "",
                passwordChange: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) =>
                handleChangePassword(values, { resetForm })
            }
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
                <View>
                    <Stack.Screen
                        options={{
                            headerStyle: {
                                backgroundColor: "rgb(242,242,242)",
                            },
                            headerTintColor: "#000",
                            headerShadowVisible: false,
                        }}
                    />
                    <View style={styles.header}>
                        <Text style={styles.namePage}>Change Password</Text>
                        <Text style={styles.des}>
                            Notification will be sent to your email or mobile
                            number
                        </Text>
                    </View>
                    <View style={styles.changeForm}>
                        <View style={styles.inputWrap}>
                            <TextInput
                                secureTextEntry={!showPassword}
                                placeholderTextColor={"gray"}
                                style={styles.inputStyle}
                                placeholder="Old Password"
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
                                        !showPassword
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
                        <View style={styles.inputWrap}>
                            <TextInput
                                secureTextEntry={!showPassword}
                                placeholderTextColor={"gray"}
                                style={styles.inputStyle}
                                placeholder="New Password"
                                value={values.passwordChange}
                                onChangeText={handleChange("passwordChange")}
                                onBlur={() => setFieldTouched("passwordChange")}
                            />
                        </View>
                        {touched.passwordChange && errors.passwordChange ? (
                            <Text style={styles.textError}>
                                {errors.passwordChange}
                            </Text>
                        ) : null}
                        <Button
                            variant="primary"
                            onPress={handleSubmit}
                            style={styles.button}
                            disabled={!isValid}
                        >
                            Send
                        </Button>
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    header: {
        paddingLeft: 30,
    },
    namePage: {
        fontSize: 30,
        fontFamily: FONT.bold,
        marginBottom: 6,
    },
    des: {
        fontSize: 12,
        fontFamily: FONT.regular,
    },
    changeForm: {
        padding: 30,
        gap: 30,
    },
    inputWrap: {
        maxHeight: 50,
        width: "100%",
        height: "100%",
        borderRadius: 30,
        flexDirection: "row",
    },
    inputStyle: {
        flex: 1,
        borderRadius: 30,
        textAlign: "left",
        backgroundColor: COLORS.white,
        ...SHADOWS.all,
        paddingHorizontal: 40,
        fontFamily: FONT.regular,
    },
    eye: {
        position: "absolute",
        right: 12,
        top: 14,
    },
    button: {
        borderRadius: 30,
        ...SHADOWS.all,
        height: 50,
    },
    textError: {
        marginTop: -20,
        marginBottom: 10,
        paddingLeft: 12,
        fontFamily: "Montserrat_MediuItalic",
        fontSize: 12,
        color: COLORS.error,
    },
});
