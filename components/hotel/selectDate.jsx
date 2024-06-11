import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import icons from "../../constants/icons";
import Slider from '@react-native-community/slider';
import { useState } from "react";
import SelecHouse from "./selechouse";
import Button from "../ui/button";

const FilterModal = ({ modalVisible, setModalVisible }) => {
    const [person, setPerson] = useState(1);
    const [tripType, setTripType] = useState('round-trip'); // Add state for trip type

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <DatePicker
                selected={"date"}
                maximumDate={currentDate.toISOString()}
                style={{ width: "100%" }}
                mode="calendar"
            // selected="date"
            // onDateChange={(date) => setText(date)}
            />
        </Modal>
    );
}

export default FilterModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingVertical: 20,
        position: 'relative',
    },
    wrapClose: {
        position: 'absolute',
        right: 30,
        top: 20,
    },
    close: {
        fontSize: 20,
    },
    journey: {
        paddingHorizontal: 30,
        gap: 20,
        marginVertical: 20,
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 60,
        paddingVertical: 8,
        borderRadius: 10,
    },
    options: {
        paddingHorizontal: 30,
        gap: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    inputStyle: {
        height: 40,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 20,
        fontFamily: FONT.boldI,
        fontSize: 16,
    },
    tripTypeButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    selectedTripTypeButton: {
        backgroundColor: COLORS.primary,
    },
    tripTypeButtonText: {
        fontFamily: FONT.regular,
        fontSize: 14,
        color: COLORS.primary,
    },
    selectedTripTypeButtonText: {
        color: COLORS.white,
    },
})