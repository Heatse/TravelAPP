import React from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT } from "../../constants/theme";
import icons from "../../constants/icons";
import { RoomService } from "../../service/roomService";
import Button from "../ui/button";

const avatarImage = require("../../assets/images/review_img.png");

const ReviewUsers = ({ item, setComment, comment }) => {
    const onDelete = () => {
        handleDeleteComment(item?.id);
    };

    const handleDeleteComment = async (id) => {
        const roomService = new RoomService();
        try {
            const response = await roomService.deleteComment(id);
            console.log(response);
            const updatedComments = comment.filter((ot) => ot.id !== id);
            setComment(updatedComments);
        } catch (error) {
            Alert.alert("Error", "Comment deleted Error");
        }
    };

    const formatCommentDate = (commentDate) => {
        const date = new Date(commentDate);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return formattedDate;
    };

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.item}>
                        <View style={styles.avatarContainer}>
                            <Image source={avatarImage} style={styles.avatar} />
                        </View>
                        <View style={styles.text}>
                            <View>
                                <Text style={styles.text1}>
                                    {item?.user.firstName +
                                        " " +
                                        item?.user.lastName}
                                </Text>
                                <Text style={styles.text2}>
                                    {formatCommentDate(item?.commentDate)}
                                </Text>
                            </View>
                            <View style={styles.rating}>
                                <Text style={styles.ratingText}>Rating</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {Array(item.stars)
                                        .fill()
                                        .map((_, index) => (
                                            <Image
                                                key={index}
                                                source={icons.star}
                                                style={styles.starIcon}
                                            />
                                        ))}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentText}>{item.content}</Text>
                        <Button
                            style={styles.replyText}
                            onPress={() => {
                                Alert.alert(
                                    "Confirm Delete",
                                    "Are you sure you want to delete this comment?",
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel",
                                        },
                                        {
                                            text: "Delete",
                                            onPress: () =>
                                                handleDeleteComment(item?.id),
                                        },
                                    ]
                                );
                            }}
                        >
                            Delete
                        </Button>
                    </View>
                    <View style={styles.horizontalLine}></View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ReviewUsers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        paddingRight: 10,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    avatarContainer: {
        borderRadius: 50,
        overflow: "hidden",
    },

    avatar: {
        width: 40,
        height: 40,
    },

    text: {
        marginLeft: 10,
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },

    text1: {
        fontSize: 16,
        fontFamily: FONT.bold,
    },

    text2: {
        fontSize: 12,
        fontFamily: FONT.regular,
    },

    rating: {
        alignItems: "center",
        flexDirection: "column",
    },

    ratingText: {
        fontSize: 16,
    },

    starIcon: {
        width: 10,
        height: 10,
        top: 3,
    },

    commentContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
    },

    commentText: {
        fontSize: 12,
        fontFamily: FONT.regular,
    },

    replyText: {
        fontSize: 14,
        marginTop: 10,
    },

    horizontalLine: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.gray2, // Màu sắc của đường gạch ngang
        marginVertical: 10, // Khoảng cách dọc giữa đường gạch ngang và phần còn lại
    },
});
