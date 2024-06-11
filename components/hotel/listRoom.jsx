import React, { useState } from 'react'
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { FONT } from '../../constants/theme';
import icons from '../../constants/icons';
import { Stack, router } from "expo-router";

const ListRoom = ({ item }) => {

    const handleClick = () => {
        router.push(`/hotel/infoRoom/${item?.id}`);
    };

    return (
        <TouchableOpacity onPress={handleClick}>

            <View style={styles.listpage}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: item?.images[0] || "http://res.cloudinary.com/df0wme1wh/image/upload/v1715668357/kpmsn5iplvnyjogb3c5x.jpg" }} resizeMode="cover" />
                </View>

                <View style={styles.text}>
                    <View style={styles.t1}>
                        <Text style={styles.text1}>{item?.accommodation?.name.slice(0, 14) || "Metro Ben Thanh"}</Text>
                        <View style={styles.loca}>
                            <Text style={styles.text2}>{item?.accommodation?.address || " Việt Nam"}</Text>
                            <Image source={icons.location} style={{ width: 10, height: 10 }} />
                        </View>
                        <Image source={icons.star} style={{ width: 10, height: 10, top: 2, marginBottom: 5 }} />
                    </View>
                    <View style={styles.t2}>
                        <Text style={[styles.text4, { textAlign: 'right' }]}>{item?.price || "600"} VND</Text>
                        <Text style={[styles.text5, { textAlign: 'right' }]}>Mỗi đêm</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListRoom;

const styles = StyleSheet.create({
    listpage: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'flex-start',
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
    },
    imageContainer: {
        width: '100%',
        height: 230,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'aqua',
    },
    image: {
        width: 540,
        height: 300
    },
    loca: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    t1: {
        zIndex: 1,
        maxWidth: 350,
        flex: 1
    },
    t2: {
        width: "50%",
        paddingRight: 10,
        justifyContent: 'center'
    },

    text: {
        zIndex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginRight: 8,
        paddingLeft: 20
    },

    text1: {
        fontSize: 20,
        fontFamily: FONT.bold
    },

    text2: {
        fontSize: 8,
        fontFamily: FONT.regular
    },

    text3: {
        fontSize: 8,
        fontFamily: FONT.regular
    },

    text4: {
        fontSize: 20,
        fontFamily: FONT.bold
    },

    text5: {
        fontSize: 12,
        fontFamily: FONT.regular
    }
});
