import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import icons from '../../constants/icons';
import Button from '../ui/button';
import { LocationService } from '../../service/locationService';

const avatarImage = require('../../assets/images/review_img.png');

const ReviewUsers = ({ item, setComment, comment }) => {


    const locationService = new LocationService();

    const handleDeleteComment = async (id) => {
        try {
            const response = await locationService.deleteComment(id);
            console.log(response)
            const updatedComments = comment.filter(ot => ot.id !== id);
            setComment(updatedComments);

        } catch (error) {
            console.error("Error deleting comment:", error);
            Alert.alert("Error", "Failed to delete comment. Please try again later.");
        }
    };


    const formatCommentDate = (commentDate) => {
        const date = new Date(commentDate);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return formattedDate;
    };

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.avatarContainer}>
                    <Image source={avatarImage} style={styles.avatar} />
                </View>
                <View style={styles.text}>
                    <View>
                        <Text style={styles.text1}>{item?.user.firstName + " " + item?.user.lastName}</Text>
                        <Text style={styles.text2}>{formatCommentDate(item?.commentDate)}</Text>
                    </View>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>Rating</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                Array(item.stars).fill().map((_, index) => (
                                    <Image key={index} source={icons.star} style={styles.starIcon} />
                                ))
                            }
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
                                    style: "cancel"
                                },
                                {
                                    text: "Delete",
                                    onPress: () => handleDeleteComment(item?.id)
                                }
                            ]
                        );
                    }}
                >
                    Delete
                </Button>
            </View>
            <View style={styles.horizontalLine}></View>
        </View>
    )
}

export default ReviewUsers

const styles = StyleSheet.create({

    container: {
        marginLeft: 10,
        paddingRight: 10,
        alignItems: "stretch",

    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    avatarContainer: {
        borderRadius: 50,
        overflow: 'hidden',
    },

    avatar: {
        width: 40,
        height: 40,
    },

    text: {
        marginLeft: 10,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        alignItems: 'center',
        flexDirection: 'column',
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
        flexDirection: 'column',
        justifyContent: 'space-around',
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
        borderBottomColor: COLORS.gray2,
        marginVertical: 10,
    },
});
