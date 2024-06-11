import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import icons from '../../constants/icons';

const ReviewSummary = ({ averageStars, reviewCounts }) => {

    const totalReviews = Object.values(reviewCounts).reduce((acc, count) => acc + count, 0);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.t1}>{averageStars.toFixed(1)}</Text>
                <View style={{ left: 10 }}>
                    <Text style={styles.t2}>Review summary</Text>
                    <Image source={icons.star} style={{ width: 10, height: 10, marginLeft: 3 }} />
                </View>
            </View>
            <View style={styles.starsContainer}>
                {Object.keys(reviewCounts).map(star => (
                    <View key={star} style={styles.starRow}>
                        <Text style={styles.starText}>{star}
                            <Image source={icons.star} style={{ width: 10, height: 10, top: 2, marginBottom: 5 }} />
                        </Text>
                        <View style={styles.starBarContainer}>
                            <View
                                style={[
                                    styles.starBar,
                                    {
                                        width: `${(reviewCounts[star] / totalReviews) * 100}%`,
                                        backgroundColor: reviewCounts[star] > 0 ? COLORS.primary : COLORS.gray
                                    }
                                ]}

                            />
                        </View>
                        <Text style={styles.starCount}>({reviewCounts[star]})</Text>
                    </View>
                ))}
            </View>
            <Text style={styles.totalReviewCount}>Total reviews: {totalReviews}</Text>
        </View>
    );
};

export default ReviewSummary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        left: 15,
        right: 40,
        borderRadius: 20,
        marginBottom: 21,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxWidth: 362,
        maxHeight: 220
    },
    t1: {
        fontSize: 30,
        fontFamily: FONT.bold,
        color: COLORS.black,
        marginLeft: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    t2: {
        fontSize: 15,
        fontFamily: FONT.regular,
        marginLeft: 10,
    },
    starsContainer: {
        width: '100%',
        overflow: 'hidden',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    starText: {
        fontSize: 15,
        fontFamily: FONT.regular,
        marginRight: 5,
        width: 50,
    },
    starBarContainer: {
        flex: 1,
        height: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 5,
    },
    starBar: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    starCount: {
        fontSize: 15,
        fontFamily: FONT.regular,
    },
    totalReviewCount: {
        fontSize: 14,
        fontFamily: FONT.regular,
        marginTop: 10,
        marginLeft: 10,
        paddingRight: 10,
    },
});
