import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    ActivityIndicator,
} from "react-native";
import { COLORS, FONT } from "../../../../constants/theme";
import ReviewUsers from "../../../../components/hotel/reviewUsers";
import { Stack, router, useLocalSearchParams } from "expo-router";
import Button from "../../../../components/ui/button";
import { RoomService } from "../../../../service/roomService";

const FormData = global.FormData;
const ReviewPage = () => {
    const { id } = useLocalSearchParams();

    const [comment, setComment] = useState({});
    const [isWritingComment, setIsWritingComment] = useState(false);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState("1");
    const [isLoading, setIsLoading] = useState(true);

    const roomService = new RoomService();

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        setIsLoading(true);
        const response = await roomService.getCommentRoom(id);
        setComment(response);
        setIsLoading(false);
    };

    const onBooking = async () => {
        await sendBookingToServer(id);
        getComments();
    };

    const sendBookingToServer = async (id) => {
        const data = new FormData();
        data.append("content", content);
        data.append("stars", rating);
        // data.append("images", images);
        try {
            const response = await roomService.commentRoom(id, data);
            setContent("");
            setRating("0");
            Alert.alert("Success", "Comment successfully");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        }
    };

    const handleReviewPress = () => {
        if (isCommentOpen) {
            setIsWritingComment(false);
            setIsCommentOpen(false);
        } else {
            setIsWritingComment(true);
            setIsCommentOpen(true);
        }
    };

    const handleRatingPress = (selectedRating) => {
        setRating(selectedRating);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTintColor: "#000",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 30,
                        fontFamily: FONT.bold,
                    },
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Button
                            style={styles.button}
                            onPress={handleReviewPress}
                            variant="primary"
                        >
                            Đánh Giá
                        </Button>
                    ),
                }}
            />

            <Text style={styles.text}> Review ({comment.length})</Text>

            <View style={styles.horizontalLine}></View>

            {isWritingComment && (
                <View style={{ marginBottom: 24 }}>
                    <TextInput
                        placeholder="Nhập bình luận của bạn..."
                        style={styles.input}
                        value={content}
                        onChangeText={setContent}
                    />
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleRatingPress(item)}
                            >
                                <Text
                                    style={[
                                        styles.ratingStar,
                                        item <= rating && {
                                            color: COLORS.yellow,
                                        },
                                    ]}
                                >
                                    ★
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button variant='outline'>Tải ảnh</Button>
                        <Button variant='secondary' onPress={handleReviewPress}>Đóng</Button>
                        <Button onPress={onBooking}>Đăng</Button>
                    </View>
                </View>
            )}
            {comment.length > 0 ? (
                comment.map((item, index) => (
                    <ReviewUsers
                        setComment={setComment}
                        comment={comment}
                        key={index}
                        item={item}
                    />
                ))
            ) : (
                <Text style={{ textAlign: "center" }}>No Comment Yet</Text>
            )}
        </View>
    );
};

export default ReviewPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.white,
    },

    text: {
        fontSize: 20,
        fontFamily: FONT.bold,
        marginLeft: 20,
        marginRight: 20,
    },

    horizontalLine: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.gray2,
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 20,
    },

    button: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },

    ratingStar: {
        fontSize: 30,
        color: COLORS.gray,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200
    },
});
