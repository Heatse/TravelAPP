import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import Button from "../ui/button";
import SelecHouse from "./selechouse";
import DatePicker from "react-native-modern-datepicker";
import SelecType from "./selectType";

const FilterModal = ({ modalVisible, setModalVisible, setFilter }) => {
    const currentDate = new Date();
    const [person, setPerson] = useState(1);
    const [priceMin, setPriceMin] = useState("0");
    const [priceMax, setPriceMax] = useState("100000000");
    const [accommodationType, setAccommodationType] = useState([]);
    const [roomtype, setRoomtype] = useState("");

    const handleAccommodationTypeChange = (type, isSelected) => {
        let updatedAccommodationType;
        if (isSelected) {
            updatedAccommodationType = [...accommodationType, type];
        } else {
            updatedAccommodationType = accommodationType.filter(
                (item) => item !== type
            );
        }
        setAccommodationType(updatedAccommodationType);
    };

    const onFilter = () => {
        const data = {
            priceMin: priceMin,
            priceMax: priceMax,
            accommodationTypes:
                accommodationType.length <= 0 ? null : accommodationType,
            type: roomtype.length <= 0 ? null : roomtype,
        };
        setFilter(data);
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <ScrollView contentContainerStyle={styles.modalContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Filter</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>⨉</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.options}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price range</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType="numeric"
                                value={priceMin}
                                onChangeText={setPriceMin}
                            />
                            <Text style={styles.separator}>-</Text>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType="numeric"
                                value={priceMax}
                                onChangeText={setPriceMax}
                            />
                        </View>
                    </View>

                    <SelecHouse
                        setAccommodationType={handleAccommodationTypeChange}
                    />

                    <SelecType setRoomtype={setRoomtype} />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Number of Person</Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={1}
                                maximumValue={50}
                                value={person}
                                onValueChange={setPerson}
                                step={1}
                                minimumTrackTintColor={COLORS.primary}
                                maximumTrackTintColor={COLORS.lightGray}
                                thumbTintColor={COLORS.primary}
                            />
                            <Text style={styles.sliderValue}>
                                {Math.floor(person)}
                            </Text>
                        </View>
                    </View>
                </View>
                <Button
                    variant="primary"
                    style={styles.applyButton}
                    onPress={onFilter}
                >
                    Apply
                </Button>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: FONT.bold,
    },
    closeButton: {
        position: "absolute",
        right: 20,
    },
    closeButtonText: {
        fontSize: 20,
    },
    options: {
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontFamily: FONT.semibold,
        fontSize: 16,
        color: COLORS.gray3,
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputStyle: {
        flex: 1,
        height: 40,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 20,
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    separator: {
        marginHorizontal: 10,
        color: COLORS.gray3,
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    datePickerContainer: {
        flex: 1,
    },
    dateLabel: {
        fontFamily: FONT.semibold,
        fontSize: 14,
        color: COLORS.gray3,
        marginBottom: 8,
    },
    sliderContainer: {
        alignItems: "center",
    },
    slider: {
        width: "100%",
        marginBottom: 10,
    },
    sliderValue: {
        fontFamily: FONT.semibold,
        fontSize: 16,
        color: COLORS.gray3,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
        marginHorizontal: "10%",
        marginBottom: 20,
    },
});

export default FilterModal;
