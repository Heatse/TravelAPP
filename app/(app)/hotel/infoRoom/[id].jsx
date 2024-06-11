import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
    ActivityIndicator,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { COLORS, FONT } from "../../../../constants/theme";
import icons from "../../../../constants/icons";
import ReviewSumery from "../../../../components/hotel/reviewSumery";
import ImgDetails from "../../../../components/hotel/imgDetails";
import ReviewUsers from "../../../../components/hotel/reviewUsers";
import Button from "../../../../components/ui/button";
const image = require("../../../../assets/images/list_1.png");
const mapImg = require("../../../../assets/images/map.png");
const { width, height } = Dimensions.get("screen");
import { RoomService } from "../../../../service/roomService";
import DatePicker from "react-native-modern-datepicker";
import Toast from "react-native-toast-message";

const InfoRoom = () => {

    const currentDate = new Date();
    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [checkInDate, setCheckInDate] = useState(
        `${currentDate.getFullYear()}/${(
            "0" +
            (currentDate.getMonth() + 1)
        ).slice(-2)}/${("0" + currentDate.getDate()).slice(-2)}`
    );
    const [checkOutDate, setCheckOutDate] = useState(
        `${currentDate.getFullYear()}/${(
            "0" +
            (currentDate.getMonth() + 1)
        ).slice(-2)}/${("0" + currentDate.getDate()).slice(-2)}`
    );
    const [isExpanded, setIsExpanded] = useState(true);
    const [text, setText] = useState("");
    const [room, setRoom] = useState({});
    const [averageStars, setAverageStars] = useState(0);
    const [reviewCounts, setReviewCounts] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
    const [comment, setComment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const toggleText = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setText(room?.description.slice(0, 30));
        } else {
            setText(room?.description);
        }
    };

    const roomService = new RoomService();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await roomService.getRoomById(id);
            setRoom(response);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await roomService.getCommentRoom(id);
            setComment(response.slice(0, 3));
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const avgStarsResponse = await roomService.getStarByRoomId(id);
                setAverageStars(avgStarsResponse);

                const commentsResponse = await roomService.getCommentRoom(id);
                const counts = commentsResponse.reduce((acc, comment) => {
                    const rating = comment.stars; // Assume each comment has a 'rating' property
                    if (acc[rating]) {
                        acc[rating] += 1;
                    } else {
                        acc[rating] = 1;
                    }
                    return acc;
                }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
                setReviewCounts(counts);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);



    const onBooking = () => {
        sendBookingToServer();
    };

    const sendBookingToServer = async () => {
        const roomService = new RoomService();
        const data = {
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomId: id,
        };
        try {
            const response = await roomService.bookingRoom(data);
            if (response.bookingRoom) {
                router.push(`/hotel/success/${response?.bookingRoom?.id}`);
            } else {
                Alert(response.message);
            }
        } catch (error) {
            Alert.alert("Phòng đã được đặt trong thời gian này, Yêu cầu chọn ngày khác");
        }
    };


    const handleCheckInDateChange = (date) => {
        setCheckInDate(date);
    };

    const handleCheckOutDateChange = (date) => {
        setCheckOutDate(date);
    };

    return (


        <View style={styles.container}>
            <ScrollView>
                <ImageBackground
                    source={{ uri: room?.images ? room?.images[0] : "http://res.cloudinary.com/df0wme1wh/image/upload/v1715668357/kpmsn5iplvnyjogb3c5x.jpg" }}
                    resizeMode="cover"
                    style={styles.image}
                >
                    <Stack.Screen
                        options={{
                            headerStyle: {
                                backgroundColor: "rgb(242,242,242)",
                            },
                            headerTintColor: "#000",
                            headerShadowVisible: false,
                            headerTitleStyle: {},
                            headerTitleAlign: "center",
                        }}
                    />
                </ImageBackground>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                ) : (
                    <View style={styles.container2}>
                        <View style={styles.text}>
                            <Text style={styles.text1}>{room?.accommodation?.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text3}>Phòng:</Text>
                                <Text style={styles.text3}>
                                    {room?.roomNumber}
                                </Text>
                            </View>
                            <Text style={styles.text3}>{room?.type}</Text>
                            <View style={styles.t1}>
                                <View style={styles.t}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            router.push({ pathname: "hotel/compare", params: { currentRoomId: room.id } });

                                        }}
                                        style={styles.t1}
                                    >
                                        <Image
                                            source={icons.compare}
                                            style={{ width: 14, height: 14 }}
                                        />
                                        <Text style={styles.text2}>Compare</Text>
                                    </TouchableOpacity>

                                    <View style={styles.t1}>
                                        <Text style={styles.text2}>
                                            {room?.accommodation?.address}
                                        </Text>
                                        <Image
                                            source={icons.location}
                                            style={{
                                                width: 10,
                                                height: 10,
                                                left: 1,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={[
                                            styles.text3,
                                            { textAlign: "right" },
                                        ]}
                                    >
                                        {room?.price} $
                                    </Text>
                                    <Text
                                        style={[
                                            styles.text4,
                                            { textAlign: "right" },
                                        ]}
                                    >
                                        Mỗi đêm
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.horizontalLine}></View>

                            <View>
                                <Text style={styles.text5}>Hotel details</Text>
                                <Text style={styles.text4}>{text}</Text>
                                <TouchableOpacity onPress={toggleText}>
                                    <Text style={styles.lessButton}>
                                        {isExpanded ? "More" : "Less"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ReviewSumery averageStars={averageStars} reviewCounts={reviewCounts} />

                        <View style={styles.tText}>
                            <Text style={styles.text5}>Hotel details</Text>
                        </View>

                        <View
                            style={{ padding: 10, marginLeft: 10, marginRight: 20 }}
                        >
                            <ScrollView horizontal={true}>
                                {room?.images?.length > 0 ?
                                    (room?.images.map((item, index) => (
                                        <ImgDetails key={index} item={item} />
                                    ))) : (
                                        <Text style={{ textAlign: "center" }}>
                                            No Images Yet
                                        </Text>
                                    )}
                            </ScrollView>
                            <View style={styles.horizontalLine}></View>
                        </View>

                        <View>
                            <View style={styles.tText}>
                                <Text style={styles.text5}>Reviews ({comment.length})</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push(`hotel/reviewHotel/${room?.id}`);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.primary,
                                            marginLeft: 220,
                                        }}
                                    >
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {comment.length > 0 ? (
                                comment.map((item, index) => (
                                    <ReviewUsers comment={comment} setComment={setComment} key={index} item={item} />
                                ))
                            ) : (
                                <Text style={{ textAlign: "center" }}>
                                    No Comment Yet
                                </Text>
                            )}
                        </View>



                        <Image
                            source={mapImg}
                            resizeMode="cover"
                            style={styles.image2}
                        ></Image>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={styles.dateContainer}>
                                        <View style={styles.datePickerContainer}>
                                            <Text style={styles.dateLabel}>Check-In</Text>
                                            <DatePicker
                                                selected={checkInDate}
                                                minimumDate={currentDate.toISOString()}
                                                style={{ width: "100%" }}
                                                mode="calendar"
                                                onDateChange={(date) => handleCheckInDateChange(date)}
                                            />
                                        </View>
                                        <View style={styles.datePickerContainer}>
                                            <Text style={styles.dateLabel}>Check-Out</Text>
                                            <DatePicker
                                                selected={checkOutDate}
                                                minimumDate={currentDate.toISOString()}
                                                style={{ width: "100%" }}
                                                mode="calendar"
                                                onDateChange={(date) => handleCheckOutDateChange(date)}
                                            />
                                        </View>
                                    </View>
                                    <Button
                                        style={styles.button}
                                        onPress={onBooking}
                                        variant="primary"
                                    >
                                        Book
                                    </Button>
                                    <Button
                                        style={styles.button}
                                        onPress={closeModal}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </View>
                            </View>
                        </Modal>

                        <Button
                            style={styles.button}
                            onPress={openModal}
                            variant="primary"
                        >
                            Bookings
                        </Button>
                    </View>
                )}

            </ScrollView>
        </View>
    );
};

export default InfoRoom;

const styles = StyleSheet.create({
    container: {
        alignItems: "stretch",
    },

    container2: {
        alignItems: "stretch",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: COLORS.white,
    },

    image: {
        width,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 21,
        height: 0.2 * height,
        justifyContent: "flex-end",
    },

    image2: {
        width: "100%", // Độ rộng của khung bên ngoài
        height: 200, // Độ cao của khung bên ngoài
    },

    t: {
        flex: 1,
    },

    t1: {
        flexDirection: "row",
        alignItems: "center",
    },

    text: {
        zIndex: 1,
        marginLeft: 10,
        top: 10,
        marginRight: 20,
        marginBottom: 25,
    },

    tText: {
        zIndex: 1,
        marginLeft: 10,
        top: 10,
        marginRight: 20,
        marginBottom: 25,
        flexDirection: "row",
    },

    text1: {
        fontSize: 30,
        fontFamily: FONT.bold,
    },

    text2: {
        fontSize: 10,
        fontFamily: FONT.regular,
    },

    text3: {
        fontSize: 22,
        fontFamily: FONT.bold,
    },

    text4: {
        fontSize: 12,
        fontFamily: FONT.regular,
    },

    text5: {
        fontSize: 16,
        fontFamily: FONT.regular,
    },

    horizontalLine: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.gray2, // Màu sắc của đường gạch ngang
        marginVertical: 10, // Khoảng cách dọc giữa đường gạch ngang và phần còn lại
    },

    lessButton: {
        fontSize: 14,
        color: COLORS.primary,
        textAlign: "center",
        textDecorationLine: "underline",
    },

    button: {
        width: "80%",
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 45,
        backgroundColor: COLORS.primary,
        color: COLORS.secondary,
    },
    modalContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 20,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        height: 40,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 20,
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    separator: {
        marginHorizontal: 10,
        color: COLORS.gray3,
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Thêm dòng này để căn giữa theo chiều dọc
    },
    datePickerContainer: {
        flex: 1,
        alignContent: 'center',
    },
    dateLabel: {
        fontFamily: FONT.semibold,
        alignContent: 'center',
        fontSize: 14,
        color: COLORS.gray3,
        marginBottom: 8,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200
    },
});
