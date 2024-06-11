import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { RoomService } from '../../service/roomService';
import { COLORS, FONT } from '../../constants/theme';

const ComparePage = ({ currentRoomId, compareRoomId }) => {
    const roomService = new RoomService();
    const [currentRoom, setCurrentRoom] = useState(null);
    const [compareRoom, setCompareRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);
            const currentRoomResponse = await roomService.getRoomById(currentRoomId);
            const compareRoomResponse = await roomService.getRoomById(compareRoomId);
            setCurrentRoom(currentRoomResponse);
            setCompareRoom(compareRoomResponse);
            setIsLoading(false);
        };
        fetchRooms();
    }, [currentRoomId, compareRoomId]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.roomContainer}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={[styles.roomTitle, { width: '50%' }]}>{currentRoom?.accommodation?.name.slice(0, 10)}</Text>
                    <Text style={styles.roomPrice}>{currentRoom.price} $</Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.roomPrice}>Số lượng người: {currentRoom.capacity}</Text>
                    <Text style={styles.roomPrice}>Loại phòng: {currentRoom.type}</Text>
                </View>

                <FlatList
                    data={currentRoom?.images}
                    renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} />}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsVerticalScrollIndicator={false}
                />

            </View>

            <View style={styles.horizontalLine}></View>

            <View style={styles.roomContainer}>

                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={[styles.roomTitle, { width: '50%' }]}>{compareRoom?.accommodation?.name.slice(0, 10)}</Text>
                    <Text style={styles.roomPrice}>{compareRoom.price} $</Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.roomPrice}>Số lượng người: {compareRoom.capacity}</Text>
                    <Text style={styles.roomPrice}>Loại phòng: {compareRoom.type}</Text>
                </View>

                <FlatList
                    data={compareRoom?.images}
                    renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} />}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default ComparePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roomContainer: {
        marginBottom: 20,
        borderBlockColor: COLORS.black,
    },
    roomTitle: {
        fontSize: 24,
        fontFamily: FONT.bold,
        marginBottom: 10,
    },
    image: {
        width: 250,
        height: 150,
        marginLeft: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    roomPrice: {
        fontSize: 20,
        fontFamily: FONT.bold,
        marginBottom: 10,
    },
    roomDescription: {
        fontSize: 16,
        fontFamily: FONT.regular,
    },

    horizontalLine: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.gray2, // Màu sắc của đường gạch ngang
        marginVertical: 10, // Khoảng cách dọc giữa đường gạch ngang và phần còn lại
    },
});
