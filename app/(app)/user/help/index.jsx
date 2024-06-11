import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import { COLORS, FONT } from "../../../../constants/theme";
import icons from "../../../../constants/icons";
import { Stack } from "expo-router";

const HelpCenter = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleQuestionPress = (index) => {
        setSelectedQuestion(index);
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
    };

    return (
        <View>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.header}>
                <Text style={styles.title}>How can we Help?</Text>
                <View style={styles.inputWrap}>
                    <Image source={icons.search} />
                    <TextInput
                        style={styles.inputStyle}
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        placeholder="What is your question?"
                    />
                </View>
            </View>
            <View style={styles.body}>
                <Text
                    style={{
                        fontSize: 30,
                        fontFamily: FONT.bold,
                        marginBottom: 12,
                    }}
                >
                    May I help you ?
                </Text>
                {answers.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleQuestionPress(index)}
                    >
                        <Text style={styles.question}>{item.ques}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Modal visible={selectedQuestion !== null} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {answers[selectedQuestion]?.ques}
                        </Text>
                        <Text style={styles.modalAnswer}>
                            {answers[selectedQuestion]?.ans}
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
        alignItems: "center",
        gap: 20,
        padding: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: FONT.bold,
        color: COLORS.white,
        width: "100%",
        textAlign: "left",
    },
    inputWrap: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
        backgroundColor: COLORS.white,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    inputStyle: {
        width: "85%",
    },
    question: {
        marginBottom: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 12,
    },
    modalAnswer: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "left",
    },
    closeButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: COLORS.white,
        fontWeight: "bold",
        textAlign: "center",
    },
    body: {
        padding: 30,
    },
});

export default HelpCenter;

const answers = [
    {
        ques: "How do I cancel my reservation?",
        ans: "You can cancel your reservation by logging into your account on our website or by contacting our customer service team directly.",
    },
    {
        ques: "Room Booking Cancellation Terms and Conditions",
        ans: "Our cancellation policy allows for free cancellation up to 24 hours before your reservation date. If you cancel within 24 hours, there may be a cancellation fee.",
    },
    {
        ques: "How to cancel unpaid Room Booking Pesanan",
        ans: "You can cancel unpaid room bookings by logging into your account and navigating to your reservation details. There should be an option to cancel the reservation from there.",
    },
    {
        ques: "Room bookings are canceled automatically",
        ans: "Room bookings are not automatically canceled. You need to initiate the cancellation process either through our website or by contacting our customer service team.",
    },
];
