import React, { useRef, useState, useEffect } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Search from "../../../components/home/search";
import { COLORS, FONT } from "../../../constants/theme";
import Intro3 from "../../../components/home/intro3";
import Intro1 from "../../../components/home/intro1";
import Intro2 from "../../../components/home/intro2";
import Intro4 from "../../../components/home/intro4";
import Pagination from "../../../components/pagination";
import Action from "../../../components/home/action";
import NavBar from "../../../components/navigation";
import { LocationService } from "../../../service/locationService";
import { RoomService } from "../../../service/roomService";

const { width, height } = Dimensions.get("screen");

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const [slideBanner, setSlideBanner] = useState([]);
    const [recomList, setRecomList] = useState([]);
    const [popularDest, setPopularDest] = useState([]);
    const [bestDeals, setBestDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const newIndex =
                    (prevIndex + 1) % (slideBanner?.length || slides1.length);
                flatListRef.current?.scrollToIndex({
                    animated: true,
                    index: newIndex,
                });
                return newIndex;
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isLoading]);

    const handleScroll = (event) => {
        let contentOffset = event.nativeEvent.contentOffset.x;
        if (contentOffset < 0) {
            contentOffset = 0;
        }
        const index = Math.round(contentOffset / width);
        setActiveIndex(index);
    };
    // get location in banner home
    const locationService = new LocationService();
    const roomService = new RoomService();
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await locationService.getRandomLocation();
                setSlideBanner(response);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        })();
    }, []);

    // get recommended list
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await locationService.getRandomLocation();
            setRecomList(response);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await locationService.getPopularLocation();
            setPopularDest(response);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await roomService.getRandomRoom();
            setBestDeals(response);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.home}>
            <FlatList
                key={activeIndex}
                data={[
                    { key: "main", component: "main" },
                    ...slides1,
                    ...slides2,
                    ...slides3,
                    ...slides4,
                ]}
                renderItem={({ item }) => {
                    if (item.component === "main") {
                        return (
                            <View
                                style={{
                                    position: "relative",
                                    marginBottom: 60,
                                }}
                            >
                                <Search />
                                <View style={{ height: height * 0.6 }}>
                                    {slideBanner?.length <= 0 ? (
                                        <Intro1 item={slides1[0]} />
                                    ) : (
                                        <FlatList
                                            ref={flatListRef}
                                            data={
                                                slideBanner?.length > 0
                                                    ? slideBanner
                                                    : slides1
                                            }
                                            renderItem={({ item }) => (
                                                <Intro1 item={item} />
                                            )}
                                            keyExtractor={(item, index) =>
                                                index.toString()
                                            }
                                            horizontal
                                            pagingEnabled
                                            snapToAlignment="center"
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            onScroll={handleScroll}
                                            initialScrollIndex={activeIndex}
                                            getItemLayout={(data, index) => ({
                                                length: width,
                                                offset: width * index,
                                                index,
                                            })}
                                            scrollEventThrottle={16}
                                        />
                                    )}

                                    <Pagination
                                        data={
                                            slideBanner.length > 0
                                                ? slideBanner
                                                : slides1
                                        }
                                        activeIndex={activeIndex}
                                        style={styles.pagination}
                                    />
                                </View>

                                <Action />

                                <Text style={styles.text3}>
                                    Recommended List
                                </Text>
                                {/* {recomList.length <= 0 ? (
                                    <Intro2 item={slides2[0]} />
                                ) : ( */}
                                <FlatList
                                    data={
                                        recomList.length > 0
                                            ? recomList
                                            : slides2
                                    }
                                    renderItem={({ item }) => (
                                        <Intro2 item={item} />
                                    )}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                    horizontal
                                    pagingEnabled
                                    snapToAlignment="center"
                                    showsHorizontalScrollIndicator={false}
                                />
                                {/* )} */}

                                <Text style={styles.text3}>
                                    Popular Destination
                                </Text>
                                <FlatList
                                    data={
                                        popularDest.length > 0
                                            ? popularDest
                                            : slides3
                                    }
                                    renderItem={({ item }) => (
                                        <Intro3 item={item} />
                                    )}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                    horizontal
                                    pagingEnabled
                                    snapToAlignment="center"
                                    showsHorizontalScrollIndicator={false}
                                />

                                <Text style={styles.text4}>Best Deals</Text>

                                <View
                                    style={{
                                        marginHorizontal: 30,
                                        marginBottom: 20,
                                    }}
                                >
                                    <FlatList
                                        data={
                                            bestDeals.length > 0
                                                ? bestDeals
                                                : slides4
                                        }
                                        renderItem={({ item }) => (
                                            <Intro4 item={item} />
                                        )}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                        horizontal={false}
                                        pagingEnabled
                                        snapToAlignment="center"
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </View>
                        );
                    } else {
                        return item.component; // Render other components as needed
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
                horizontal={false} // Set this to true if you want the outer list to be horizontal
                pagingEnabled={false}
                showsVerticalScrollIndicator={false}
            />
            <NavBar activePage="home" style={styles.navbar} />
        </View>
    );
};

export default Home;

const slides1 = [
    {
        images: ["https://sodulich.hanoi.gov.vn/storage/van-mieu-2.jpg"],
    },
];

const slides2 = [
    {
        images: ["https://sodulich.hanoi.gov.vn/storage/van-mieu-2.jpg"],
    },
    {
        images: ["https://sodulich.hanoi.gov.vn/storage/van-mieu-2.jpg"],
    },
    {
        images: ["https://sodulich.hanoi.gov.vn/storage/van-mieu-2.jpg"],
    },
];

const slides3 = [
    {
        images: ["https://sodulich.hanoi.gov.vn/storage/van-mieu-2.jpg"],
    },
    {
        images: ["https://sodulich.hanoi.gov.vn/storage/van-mieu-2.jpg"],
    },
];

const slides4 = [
    {
        images: "https://lh3.googleusercontent.com/gps-proxy/ALd4DhHD5e_ZCmq8BeOWu79enMmCV9JKzzkt8VOrwH6b_WcRNbVkW_pE5ZjL6We_8-HZN0FLO5h6IVVOneBJ4wPAK5-0xX90hM_QGAnTzvfMNd3UI8grV8FgSvE5kKI0c6K3Pw3gyUg2AX6t1nMOXTYxy7zuLIuexpZz1BjnIxCMSX68kDLcX-FesdZ0=w287-h192-n-k-rw-no-v1",
        hotel: "Hi Hotel",
        location: "Dubai - Uni Emirat Arab",
        roomNumber: "987",
        price: "987",
        available: "false",
    },
    {
        images: "https://lh3.googleusercontent.com/gps-proxy/ALd4DhHQObAZXRGeC7kTMAK3VYBS1euFwMMShyG3Oqul3mbzGfCAZgkJJTUTPBLVTDnOsMgV25Vq4ijfnfrgkwJ9HklE9IgRidKR9zj9R9sWILr6S_l2R9DzKsB0k5n4490SIMXMBHtOhZsC0ICsId9iCEvOe_FhRxeKYwZGHsqmXU4FIVMF0q5kfJrN=w287-h192-n-k-rw-no-v1",
        hotel: "Hotel Burj Al Arab",
        location: "Dubai - Uni Emirat Arab",
        roomNumber: "103",
        price: "$ 9.999.999",
        available: "false",
    },
    {
        images: "https://lh3.googleusercontent.com/p/AF1QipM3fK234zg_KTXwvUPyDQD_GWWQT7UhJn9LTdj9=w287-h192-n-k-rw-no-v1",
        hotel: "Hotel Burj Al Arab",
        location: "Dubai - Uni Emirat Arab",
        roomNumber: "102",
        price: "$ 9.999.999",
        available: "false",
    },
];

const styles = StyleSheet.create({
    image: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 21,
        justifyContent: "space-between",
    },

    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
    },

    text1: {
        fontSize: 30,
        fontFamily: FONT.bold,
        color: COLORS.white,
    },

    text2: {
        fontSize: 12,
        fontFamily: FONT.regular,
        color: COLORS.white,
    },

    text3: {
        fontSize: 20,
        fontFamily: FONT.bold,
        color: COLORS.black,
        margin: 22,
    },

    text4: {
        fontSize: 20,
        fontFamily: FONT.bold,
        color: COLORS.black,
        margin: 22,
    },

    view1: {
        alignItems: "flex-start",
        justifyContent: "flex-start",

        borderRadius: 30,
    },

    slide: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 21,
        height: 0.6 * height,
        justifyContent: "center",
    },

    pagination: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    navbar: {
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        width: "100%",
        backgroundColor: COLORS.white,
    },
    home: {
        backgroundColor: "white",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
