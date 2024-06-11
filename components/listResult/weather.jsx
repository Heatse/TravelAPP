import React from "react";
import { Modal, StyleSheet, Text, View, Button, Image } from "react-native";
import { FONT } from "../../constants/theme";

const Weather = ({ setModalVisible, weather, modalVisible }) => {
    const name = weather?.name ?? "Unknown Location";
    const temp = weather?.main?.temp ?? "N/A";
    const feels_like = weather?.main?.feels_like ?? "N/A";
    const humidity = weather?.main?.humidity ?? "N/A";
    const pressure = weather?.main?.pressure ?? "N/A";
    const weatherDetails = weather?.weather?.[0] ?? {};
    const speed = weather?.wind?.speed ?? "N/A";
    const visibility = weather?.visibility ?? "N/A";
    const cloudiness = weather?.clouds?.all ?? "N/A";
    const rain = weather?.rain?.["1h"] ?? null;

    const getWeatherIcon = (icon) =>
        `http://openweathermap.org/img/wn/${icon}@2x.png`;

    if (!weather) {
        return (
            <View style={styles.container}>
                <Text>No weather data available.</Text>
            </View>
        );
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.headerText}>{name}</Text>
                    {weatherDetails.icon && (
                        <Image
                            source={{
                                uri: getWeatherIcon(weatherDetails.icon),
                            }}
                            style={styles.weatherIcon}
                        />
                    )}
                    <Text style={styles.descriptionText}>
                        {weatherDetails.description?.toUpperCase() || "N/A"}
                    </Text>
                    <Text style={styles.tempText}>
                        Temp:{" "}
                        {temp !== "N/A" ? Math.floor(temp - 273.15) : temp}°C
                        (Feels like:{" "}
                        {feels_like !== "N/A"
                            ? Math.floor(feels_like - 273.15)
                            : feels_like}
                        °C)
                    </Text>
                    <Text style={styles.infoText}>Humidity: {humidity}%</Text>
                    <Text style={styles.infoText}>
                        Pressure: {pressure} hPa
                    </Text>
                    <Text style={styles.infoText}>Wind Speed: {speed} m/s</Text>
                    <Text style={styles.infoText}>
                        Visibility: {visibility} m
                    </Text>
                    <Text style={styles.infoText}>
                        Cloudiness: {cloudiness}%
                    </Text>
                    {rain !== null && (
                        <Text style={styles.infoText}>
                            Rain: {rain} mm (last hour)
                        </Text>
                    )}
                    <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Weather;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: 300,
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
        fontFamily: FONT.bold,
        marginBottom: 10,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    descriptionText: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: FONT.semibold,
    },
    tempText: {
        fontSize: 16,
        marginBottom: 5,
    },
    infoText: {
        fontFamily: FONT.regular,
        fontSize: 14,
        marginVertical: 2,
    },
});
