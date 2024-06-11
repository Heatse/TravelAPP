import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const ChooseVehilce = ({ onVehicleTypeChange, vehicleTypes }) => {
    console.log(vehicleTypes, "vehicleTypes");
    const [isEnabledPlane, setIsEnabledPlane] = useState(
        vehicleTypes?.includes("Plane")
    );
    const [isEnabledSleeperBus, setIsEnabledSleeperBus] = useState(
        vehicleTypes?.includes("Sleeper Bus")
    );
    const [isEnabledTrain, setIsEnabledTrain] = useState(
        vehicleTypes?.includes("Train")
    );

    const toggleSwitchPlane = () => {
        setIsEnabledPlane((previousState) => !previousState);
        onVehicleTypeChange("Plane", !isEnabledPlane);
    };
    const toggleSwitchSleeperBus = () => {
        setIsEnabledSleeperBus((previousState) => !previousState);
        onVehicleTypeChange("Bus", !isEnabledSleeperBus);
    };
    const toggleSwitchTrain = () => {
        setIsEnabledTrain((previousState) => !previousState);
        onVehicleTypeChange("Train", !isEnabledTrain);
    };

    return (
        <View>
            <Text style={[styles.text, styles.text2]}>Vehicle Type</Text>
            <View style={styles.row}>
                <Text style={styles.text}>Plane</Text>
                <Switch
                    trackColor={{ false: "#DFE6E9", true: COLORS.primary }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchPlane}
                    value={isEnabledPlane}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Sleeper Bus</Text>
                <Switch
                    trackColor={{ false: "#DFE6E9", true: COLORS.primary }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchSleeperBus}
                    value={isEnabledSleeperBus}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Train</Text>
                <Switch
                    trackColor={{ false: "#DFE6E9", true: COLORS.primary }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchTrain}
                    value={isEnabledTrain}
                />
            </View>
        </View>
    );
};

export default ChooseVehilce;
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
