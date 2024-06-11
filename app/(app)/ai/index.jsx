import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../../components/ui/button";
import { COLORS, FONT, SHADOWS } from "../../../constants/theme";
import { useState } from "react";
import { Stack } from "expo-router";
import Slider from "@react-native-community/slider";
import NavBar from "../../../components/navigation";

const AISchedule = () => {
    const [person, setPerson] = useState(1);
    return (
        <View style={styles.aiPage}>
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
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: FONT.semibold,
                    color: COLORS.gray3,
                    textAlign: "center",
                }}
            >
                {" "}
                Let ‘s PS help you schedule
            </Text>
            <View style={styles.wrapForm}>
                <View style={styles.wrapInput}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="Type your destination"
                    />
                </View>
                <View style={styles.wrapInput}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="From"
                    />
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="To"
                    />
                </View>
                <View style={styles.wrapInput}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="Type your action"
                    />
                </View>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: FONT.semibold,
                        color: COLORS.gray3,
                    }}
                >
                    Price Range
                </Text>
                <View style={styles.wrapInput}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="Min"
                        keyboardType="numeric"
                        value="100000"
                    />
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="Max"
                        keyboardType="numeric"
                        value="100000000"
                    />
                </View>
                <Text
                    style={{
                        fontFamily: FONT.semibold,
                        fontSize: 16,
                        color: COLORS.gray3,
                    }}
                >
                    Number of Person
                </Text>
                <View style={styles.person}>
                    <Text
                        style={{
                            fontFamily: FONT.semiboldI,
                            fontSize: 20,
                            color: COLORS.black,
                        }}
                    >
                        {" "}
                        {Math.floor(person)}
                    </Text>
                    <Slider
                        style={{}}
                        onValueChange={(value) => setPerson(value)}
                        minimumValue={1}
                        maximumValue={50}
                    />
                </View>
                <View style={styles.wrapButton}>
                    <Button>Schedule</Button>
                </View>
            </View>
            <NavBar activePage="" style={styles.navbar} />
        </View>
    );
};

export default AISchedule;

const styles = StyleSheet.create({
    aiPage: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapInput: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        gap: 12,
    },
    inputStyle: {
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        ...SHADOWS.all,
    },
    wrapForm: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    person: {
        gap: 12,
        marginBottom: 30,
    },
    wrapButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    navbar: {
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        width: "100%",
        backgroundColor: COLORS.white,
    },
});
