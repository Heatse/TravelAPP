import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';

const image = require('../../assets/images/review_img.png');

const ImgDetails = ({ item }) => {
    return (
        <View style={styles.container} >
            <Image style={styles.image} source={{ uri: item }} resizeMode="contain" />
        </View>
    )
}

export default ImgDetails

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    image: {
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: 10,
    },

})