import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import icons from "../../constants/icons";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Switch } from "react-native-web";
import ChooseVehilce from "./chooseVehicle";
import Button from "../ui/button";
import DatePicker from "react-native-modern-datepicker";
import provinJSON from "../../utils/provinJSON";
import { Picker } from "@react-native-picker/picker";

const FilterModal = ({ modalVisible, setModalVisible, setFilter }) => {
    const currentDate = new Date();
    const [movingDate, setMovingDate] = useState(
        `${currentDate.getFullYear()}/${(
            "0" +
            (currentDate.getMonth() + 1)
        ).slice(-2)}/${("0" + currentDate.getDate()).slice(-2)}`
    );
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [priceMin, setPriceMin] = useState("0");
    const [priceMax, setPriceMax] = useState("100000000");
    const [vehicleTypes, setVehicleTypes] = useState([]);

    const handleVehicleTypeChange = (type, isSelected) => {
        let updatedVehicleTypes;
        if (isSelected && vehicleTypes.indexOf(type) === -1) {
            updatedVehicleTypes = [...vehicleTypes, type];
        } else {
            updatedVehicleTypes = vehicleTypes.filter((item) => item !== type);
        }
        setVehicleTypes(updatedVehicleTypes);
    };

    const handlePriceMinChange = (text) => {
        setPriceMin(text);
    };

    const handlePriceMaxChange = (text) => {
        setPriceMax(text);
    };
    function convertSlashToDash(inputString) {
        return inputString.replace(/\//g, "-");
    }

    const handleSelectProvince = (type, value) => {
        if (type === "departure") {
            // if (value === destination && destination !== "") {
            //     alert("Departure and destination cannot be the same.");
            //     return;
            // }
            setDeparture(value);
        } else {
            // if (value === departure && departure !== "") {
            //     alert("Departure and destination cannot be the same.");
            //     return;
            // }
            setDestination(value);
        }
    };

    const onFilter = () => {
        const data = {
            destination: destination === "" ? null : destination,
            priceMin: priceMin,
            priceMax: priceMax,
            startingLocation: departure === "" ? null : departure,
            vehicleTypes: vehicleTypes.length <= 0 ? null : vehicleTypes,
            movingDate: convertSlashToDash(movingDate),
        };
        setFilter(data);
        setModalVisible(false);
    };
    const onFilter2 = () => {
        setFilter({});
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                fontFamily: FONT.bold,
                            }}
                        >
                            Filter
                        </Text>
                        <TouchableOpacity
                            style={styles.wrapClose}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.close}>⨉</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.journey}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={departure}
                                style={styles.picker}
                                onValueChange={(itemValue) =>
                                    handleSelectProvince("departure", itemValue)
                                }
                            >
                                <Picker.Item
                                    label="Select departure"
                                    value=""
                                />
                                {provinJSON.map((province, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={province.name}
                                        value={province.name}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={destination}
                                style={styles.picker}
                                onValueChange={(itemValue) =>
                                    handleSelectProvince(
                                        "destination",
                                        itemValue
                                    )
                                }
                            >
                                <Picker.Item
                                    label="Select destination"
                                    value=""
                                />
                                {provinJSON.map((province, index) => (
                                    <Picker.Item
                                        key={index}
                                        label={province.name}
                                        value={province.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.options}>
                        <View
                            style={{
                                borderBottomColor: COLORS.lightGray,
                                borderBottomWidth: 2,
                                paddingBottom: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONT.semibold,
                                    fontSize: 16,
                                    color: COLORS.gray3,
                                    marginBottom: 8,
                                }}
                            >
                                Price range (vnđ)
                            </Text>
                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontFamily: FONT.semibold,
                                            fontSize: 14,
                                            color: COLORS.gray3,
                                        }}
                                    >
                                        Min
                                    </Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        keyboardType="numeric"
                                        value={priceMin}
                                        onChangeText={handlePriceMinChange}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontFamily: FONT.semibold,
                                            fontSize: 14,
                                            color: COLORS.gray3,
                                        }}
                                    >
                                        Max
                                    </Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        keyboardType="numeric"
                                        value={priceMax}
                                        onChangeText={handlePriceMaxChange}
                                    />
                                </View>
                            </View>
                        </View>
                        {/* <View
                            style={{
                                borderBottomColor: COLORS.lightGray,
                                borderBottomWidth: 2,
                                paddingBottom: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONT.semibold,
                                    fontSize: 16,
                                    color: COLORS.gray3,
                                }}
                            >
                                Number of Person
                            </Text>
                            <View>
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
                        </View> */}
                        <View
                            style={{
                                borderBottomColor: COLORS.lightGray,
                                borderBottomWidth: 2,
                                paddingBottom: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONT.semibold,
                                    fontSize: 16,
                                    color: COLORS.gray3,
                                    marginBottom: 8,
                                }}
                            >
                                Date Departure
                            </Text>
                            {/* <View style={styles.row}>
                                <TouchableOpacity
                                    style={[
                                        styles.tripTypeButton,
                                        tripType === "round-trip" &&
                                            styles.selectedTripTypeButton,
                                    ]}
                                    onPress={() => setTripType("round-trip")}
                                >
                                    <Text
                                        style={[
                                            styles.tripTypeButtonText,
                                            tripType === "round-trip" &&
                                                styles.selectedTripTypeButtonText,
                                        ]}
                                    >
                                        Round Trip
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.tripTypeButton,
                                        tripType === "one-trip" &&
                                            styles.selectedTripTypeButton,
                                    ]}
                                    onPress={() => setTripType("one-trip")}
                                >
                                    <Text
                                        style={[
                                            styles.tripTypeButtonText,
                                            tripType === "one-trip" &&
                                                styles.selectedTripTypeButtonText,
                                        ]}
                                    >
                                        One Trip
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={styles.row}>
                                <DatePicker
                                    selected={
                                        currentDate.toISOString() || "date"
                                    }
                                    minimumDate={currentDate.toISOString()}
                                    style={{ width: "100%" }}
                                    mode="calendar"
                                    onDateChange={(date) => setMovingDate(date)}
                                />
                            </View>
                        </View>
                        <View>
                            <ChooseVehilce
                                onVehicleTypeChange={handleVehicleTypeChange}
                                vehicleTypes={vehicleTypes}
                            />
                        </View>
                    </View>
                    <Button
                        variant="primary"
                        style={{
                            width: "80%",
                            borderRadius: 30,
                            alignSelf: "center",
                            marginVertical: 30,
                        }}
                        onPress={onFilter}
                    >
                        Apply
                    </Button>
                    <Button
                        variant="outline"
                        style={{
                            width: "80%",
                            borderRadius: 30,
                            alignSelf: "center",
                            marginBottom: 30,
                        }}
                        onPress={onFilter2}
                    >
                        Cancel
                    </Button>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    pickerContainer: {
        height: 50,
        width: "100%",
        backgroundColor: "white",
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    picker: {
        width: "100%",
        height: "100%",
    },
    header: {
        paddingVertical: 20,
        position: "relative",
    },
    wrapClose: {
        position: "absolute",
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
        width: "100%",
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 60,
        paddingVertical: 8,
        borderRadius: 10,
    },
    options: {
        paddingHorizontal: 30,
        gap: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
});
