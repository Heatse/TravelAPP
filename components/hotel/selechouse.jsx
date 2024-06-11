import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const SelectHouse = ({ setAccommodationType }) => {
    const [isEnabledHotel, setIsEnabledHotel] = useState(true);
    const [isEnabledResort, setIsEnabledResort] = useState(false);
    const [isEnabledHomestay, setIsEnabledHomestay] = useState(false);

    const toggleSwitchHotel = () => {
        setIsEnabledHotel((previousState) => !previousState);
        setAccommodationType("Hotel", !isEnabledHotel);
    };
    const toggleSwitchResort = () => {
        setIsEnabledResort((previousState) => !previousState);
        setAccommodationType("Resort", !isEnabledResort);
    };

    const toggleSwitchHomestay = () => {
        setIsEnabledHomestay((previousState) => !previousState);
        setAccommodationType("Homestay", !isEnabledHomestay);
    };

    return (
        <View>
            <Text style={[styles.text, styles.text2]}>Hotel Type</Text>
            <View style={styles.row}>
                <Text style={styles.text}>Hotel</Text>
                <Switch
                    trackColor={{ false: "#DFE6E9", true: COLORS.primary }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchHotel}
                    value={isEnabledHotel}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Resort</Text>
                <Switch
                    trackColor={{ false: "#DFE6E9", true: COLORS.primary }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchResort}
                    value={isEnabledResort}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Homestay</Text>
                <Switch
                    trackColor={{ false: "#DFE6E9", true: COLORS.primary }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchHomestay}
                    value={isEnabledHomestay}
                />
            </View>
        </View>
    );
};

export default SelectHouse;

const styles = StyleSheet.create({
    chooseVehicle: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    text: {
        fontFamily: FONT.semibold,
        fontSize: 14,
        color: COLORS.black,
    },
    text2: {
        color: COLORS.gray3,
        marginBottom: 8,
        fontSize: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
});
