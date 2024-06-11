import React, { useRef, useState, useEffect } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import SlideItem from "../../../components/slideItem";
import Pagination from "../../../components/pagination";
import { Link, useRouter } from "expo-router";
import Button from "../../../components/ui/button";

const Auth = () => {
    const { width, height } = Dimensions.get("screen");
    const [activeIndex, setActiveIndex] = useState(1);

    const flatListRef = useRef(null);

    const router = useRouter();

    const handleLogin = () => {
        router.push("/auth/login");
    };

    const handleSignup = () => {
        router.push("/auth/sign-up");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            flatListRef.current.scrollToIndex({ index: nextIndex });
            // setActiveIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleScroll = (event) => {
        let contentOffset = event.nativeEvent.contentOffset.x;
        if (contentOffset < 0) {
            contentOffset = 0;
        }
        const index = Math.round(contentOffset / width);
        setActiveIndex(index);
    };
    return (
        <View style={{ flexDirection: "column", height: height, width }}>
            <View style={{ height: height * 0.6 }}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    renderItem={({ item }) => <SlideItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    initialScrollIndex={activeIndex}
                    getItemLayout={(data, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                />
                <Pagination data={slides} activeIndex={activeIndex} />
            </View>
            <View style={styles.wrapBtn}>
                <Button
                    onPress={handleLogin}
                    style={styles.button}
                    variant="primary"
                >
                    Log in
                </Button>
                <Button
                    onPress={handleSignup}
                    style={styles.button}
                    variant="secondary"
                >
                    Create Account
                </Button>
            </View>
        </View>
    );
};

export default Auth;

const slides = [
    {
        url: require("../../../assets/images/hotelAu.png"),
        title: "Booking hotel",
        des: "Find the perfect accommodation for your trip",
    },
    {
        url: require("../../../assets/images/placeAu.png"),
        title: "Searching Place",
        des: "Discover amazing destinations around the world",
    },
    {
        url: require("../../../assets/images/planAu.png"),
        title: "Plan your trip",
        des: "Custom and fast planning with a low price",
    },
];

const styles = StyleSheet.create({
    button: {
        width: "60%",
        borderRadius: 30,
    },
    wrapBtn: {
        flex: 1,
        alignItems: "center",
        gap: 10,
        justifyContent: "flex-end",
        paddingBottom: 80,
    },
});
