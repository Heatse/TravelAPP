import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
} from "react-native";
import { COLORS, FONT } from "../../../constants/theme";
import DatePicker from "react-native-modern-datepicker";

const { width, height } = Dimensions.get("screen");
const Popup = ({ field, initialValue, onSave, onCancel, visible }) => {
    const [text, setText] = useState(initialValue);

    const handleSave = () => {
        onSave(text);
    };
    const renderInput = () => {
        switch (field) {
            case "Date of Birth":
                return (
                    <DatePicker
                        selected={text || "date"}
                        maximumDate={currentDate.toISOString()}
                        style={{ width: "100%" }}
                        mode="calendar"
                        // selected="date"
                        onDateChange={(date) => setText(date)}
                    />
                );
            case "Username":
            case "Address":
            case "Email":
            case "Phone":
            default:
                return (
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={setText}
                    />
                );
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {renderInput()}
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Popup;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "90%",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: FONT.regular,
        color: COLORS.black,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FONT.medium,
    },
    cancelButton: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.primary,
        color: COLORS.primary,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
    },
});
