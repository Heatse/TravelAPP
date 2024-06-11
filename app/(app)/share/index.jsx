import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../../components/ui/button";
import { Stack } from "expo-router";
import { COLORS, FONT, SHADOWS } from "../../../constants/theme";

const Share = () => {
    return (
        <View style={styles.sharePage}>
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
                Schedule In WestLake
            </Text>
            <View style={styles.wrapForm}>
                <View style={styles.wrapInput}>
                    <TextInput
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        style={styles.inputStyle}
                        placeholder="Type email your friend"
                    />
                </View>
                <View style={styles.button}>
                    <Button>Share</Button>
                </View>
            </View>
        </View>
    );
};

export default Share;

const styles = StyleSheet.create({
    sharePage: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wrapForm: {
        marginVertical: 20,
        paddingHorizontal: 20,
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
});
