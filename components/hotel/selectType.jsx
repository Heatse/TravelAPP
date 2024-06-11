import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const SelecType = ({ setRoomtype }) => {
    const [selectedType, setSelectedType] = useState("Lux");

    const handleSelectType = (Lux) => {
        setRoomtype(Lux);
        setSelectedType(Lux);
    };

    return (
        <View>
            <Text style={[styles.text, styles.text2]}>Type</Text>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => handleSelectType("Lux")}
                    style={[
                        styles.selection,
                        selectedType === "Lux" && styles.selected,
                    ]}
                />
                <Text style={styles.text}>Lux</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => handleSelectType("NonLux")}
                    style={[
                        styles.selection,
                        selectedType === "NonLux" && styles.selected,
                    ]}
                />
                <Text style={styles.text}>NonLux</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => handleSelectType("Vip")}
                    style={[
                        styles.selection,
                        selectedType === "Vip" && styles.selected,
                    ]}
                />
                <Text style={styles.text}>Vip</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => handleSelectType("All")}
                    style={[
                        styles.selection,
                        selectedType === "All" && styles.selected,
                    ]}
                />
                <Text style={styles.text}>All</Text>
            </View>
        </View>
    );
};

export default SelecType;

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
        justifyContent: "flex-start",
        alignItems: "stretch",
        paddingVertical: 10,
    },
    selection: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginRight: 10,
    },
    selected: {
        backgroundColor: COLORS.primary,
    },
});