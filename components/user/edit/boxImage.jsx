import React, { useState } from "react";
import { StyleSheet, Alert, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { View } from "react-native";
import Button from "../../ui/button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserService } from "../../../service/userService";

const FormData = global.FormData;
const BoxHandleImage = ({ modalVisible, setModalVisible, setUserData }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === "granted");
    };

    const handleTakePhoto = async () => {
        if (hasCameraPermission === null) {
            await getCameraPermission();
        }
        if (hasCameraPermission === false) {
            Alert.alert("No access to camera");
            return;
        }
        // handle Take Photo
    };

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedFile(result.assets[0]);
            setUserData((prev) => ({ ...prev, urlAvt: result.assets[0].uri }));
            sendToBackEnd(result.assets[0].uri);
            setModalVisible(false);
        }
    };
    const user = new UserService();

    const sendToBackEnd = async (image) => {
        try {
            const formData = new FormData();
            formData.append("image", {
                uri: image,
                type: "image/jpeg",
                name: "profile-image",
            });

            const id = await AsyncStorage.getItem("userId");
            const response = await user.changeAvatar(id, formData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Button
                        onPress={handleChoosePhoto}
                        style={styles.button}
                        variant="primary"
                    >
                        Choose Photo
                    </Button>
                    <Button
                        onPress={handleTakePhoto}
                        style={styles.button}
                        variant="secondary"
                    >
                        Take Photo
                    </Button>
                    <Button
                        onPress={() => setModalVisible(false)}
                        style={styles.button}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

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
        gap: 8,
    },
});

export default BoxHandleImage;
