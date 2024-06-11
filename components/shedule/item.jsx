import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import icons from "../../constants/icons";
import { FONT } from "../../constants/theme";
import { useState } from "react";
import { ScheduleService } from "../../service/scheduleService";
import { TextInput } from "react-native";

const Item = ({ item, style, setSchedules, schedules }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({
        des: item.des,
        start: item.start,
        end: item.end,
    });
    const handleDelete = () => {
        deleleSchedule();
    };
    const scheduleService = new ScheduleService();
    const deleleSchedule = async () => {
        const res = await scheduleService.deleteScheduleDetail(item.id);
        if (res) {
            Alert.alert("Delete Success", "Delete schedule success");
            setSchedules(
                schedules.filter((schedule) => schedule.id !== item.id)
            );
        } else {
            Alert.alert("Delete Fail", "Delete schedule fail");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedItem({ ...item });
    };
    const handleSave = async () => {
        const res = await scheduleService.editScheduleDetail(
            item.id,
            editedItem
        );
        if (res) {
            Alert.alert("Edit Success", "Edit schedule success");
            setSchedules(
                schedules.map((schedule) =>
                    schedule.id === item.id ? editedItem : schedule
                )
            );
            setIsEditing(false);
        } else {
            Alert.alert("Edit Fail", "Edit schedule fail");
        }
    };

    return (
        <View style={[styles.item, style]}>
            <TouchableOpacity onPress={handleDelete} style={styles.left}>
                <Image source={icons.bin} />
            </TouchableOpacity>
            {isEditing ? (
                <View style={styles.center}>
                    <TextInput
                        style={styles.input}
                        value={editedItem.des}
                        onChangeText={(text) =>
                            setEditedItem({ ...editedItem, des: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        value={editedItem.start}
                        onChangeText={(text) =>
                            setEditedItem({ ...editedItem, start: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        value={editedItem.end}
                        onChangeText={(text) =>
                            setEditedItem({ ...editedItem, end: text })
                        }
                    />
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveButton}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancel}>
                        <Text style={styles.cancelButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.center}>
                    <Text style={styles.title}>{item.des}</Text>
                    <Text style={styles.detail}>From: {item.start}</Text>
                    <Text style={styles.time}>To: {item.end}</Text>
                </View>
            )}

            <TouchableOpacity onPress={handleEdit} style={styles.right}>
                <Text>✏️</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Item;
const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 16,
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
    },
    center: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: FONT.bold,
    },
    detail: {
        fontSize: 9,
        fontFamily: FONT.regular,
    },
    time: {
        fontSize: 9,
        fontFamily: FONT.regular,
    },
    input: {
        fontSize: 14,
        fontFamily: FONT.regular,
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    saveButton: {
        color: "blue",
        fontSize: 14,
    },
    cancelButton: {
        color: "red",
        fontSize: 14,
    },
});
