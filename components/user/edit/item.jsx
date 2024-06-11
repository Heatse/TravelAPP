import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONT } from "../../../constants/theme";
import Popup from "./popup";
import { UserService } from "../../../service/userService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ original, field, text, style, list, setList, index }) => {
    const [editing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleEdit = () => {
        setEditing(true);
    };

    const showToast = (isTrue) => {
        isTrue
            ? Toast.show({
                  type: "success",
                  text1: "Thông báo",
                  text2: "Cập nhật thông tin thành công 👋",
              })
            : Toast.show({
                  type: "error",
                  text1: "Thông báo",
                  text2: "Cập nhật thất bại 😥",
              });
    };

    const userServices = new UserService();
    const changeUserInfo = async (field, value) => {
        const id = await AsyncStorage.getItem("userId");
        const data = {
            [original]: value,
        };
        try {
            const response = await userServices.updateUser(id, data);
            setList((prev) => {
                const newList = [...prev];
                newList[index].text = value;
                return newList;
            });
            if (response) {
                showToast(true);
            }
        } catch (error) {
            showToast(false);
            console.log(error);
        }
    };
    const handleSave = (newText) => {
        setEditing(false);
        changeUserInfo(field, newText);
        setEditedText(newText);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    return (
        <TouchableOpacity style={[styles.item, style]} onPress={handleEdit}>
            <Text style={styles.field}>{field}</Text>
            {editing ? (
                <Popup
                    field={field}
                    initialValue={text}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    visible={editing}
                />
            ) : (
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.text}
                >
                    {text}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Item;

const styles = StyleSheet.create({
    item: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    field: {
        fontSize: 16,
        fontFamily: FONT.medium,
        color: COLORS.gray3,
    },
    text: {
        fontSize: 16,
        fontFamily: FONT.medium,
        color: COLORS.black,
    },
});
