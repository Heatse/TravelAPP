import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import icons from "../../constants/icons";
import { COLORS, FONT } from "../../constants/theme";
import { router } from "expo-router";

const Action = ({ style }) => {
    const handleHotelPress = () => {
        router.push("hotel");
    };

    const handleVehiclePress = () => {
        router.push("bookvehicle");
    };
    const handlePershotPress = () => {
        router.push("ai");
    };

    return (
        <View style={[styles.action, style]}>
            <TouchableOpacity
                onPress={handleVehiclePress}
                style={styles.actionItem}
            >
                <Image source={icons.home_departure} style={styles.icon} />
                <Text style={styles.text}>Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleHotelPress}
                style={styles.actionItem}
            >
                <Image source={icons.home_hotel} style={styles.icon} />
                <Text style={styles.text}>Hotel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handlePershotPress}
                style={styles.actionItem}
            >
                <Image source={icons.home_ai} style={styles.icon} />
                <Text style={styles.text}>Pershot AI</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    action: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 12,
        height: 100,
        marginHorizontal: 30,
        borderRadius: 20,
        opacity: 0.8,
        alignItems: "center",
    },
    actionItem: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        backgroundColor: COLORS.gray2,
    },
    icon: {
        maxWidth: 50,
        maxHeight: 50,
    },
    text: {
        marginTop: 4,
        fontFamily: FONT.semibold,
        fontSize: 14,
        textAlign: "center",
        color: COLORS.black,
    },
});

export default Action;
