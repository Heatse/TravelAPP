import React from 'react';
import { Image, StyleSheet, Text, TextInput, TextInputBase, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import icons from '../../constants/icons';

const SearchHotel = ({ style, openFilter, setFilter }) => {
    return (
        <View style={styles.inputWrap}>
            <View style={styles.searchContainer}>
                <View style={[styles.search, style]}>
                    <TextInput
                        style={styles.inputStyle}
                        textDecorationLine="none"
                        placeholderTextColor={"gray"}
                        onSubmitEditing={() => { }}
                        placeholder="Room name"
                        onChangeText={(text) =>
                            setFilter((prev) => ({
                                ...prev,
                                accommodationName: text === "" ? null : text,
                            }))
                        }
                    />
                    <TouchableOpacity onPress={openFilter} style={styles.wrapFilter}>
                        <Image style={styles.iconFilter} source={icons.filter} />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={styles.searchBt}>
                    <Image style={styles.iconSearch} source={icons.search} />
                </TouchableOpacity> */}
            </View>
            {/* <View style={styles.textContainer}>
                <TouchableOpacity onPress={openFilter} style={styles.textColumn}>
                    <Text style={styles.text1}>Flight Date</Text>
                    <Text style={styles.text2}>13 Jul - 18 Jul</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <View style={styles.textColumn}>
                    <Text style={styles.text1}>Number of Person</Text>
                    <Text style={styles.text2}>1 Room - 2 Person</Text>
                </View>
            </View> */}
        </View>
    );
};

export default SearchHotel;

const styles = StyleSheet.create({
    inputWrap: {
        height: 80,
        width: '100%',
        marginBottom: 10,
        backgroundColor: COLORS.gray,
        padding: 14,
    },
    inputStyle: {
        height: 50,
        borderRadius: 30,
        textAlign: 'center',
        backgroundColor: COLORS.white,
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    search: {
        flexDirection: 'row',
        flex: 1,
    },
    iconFilter: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 10,
        top: 15,
    },
    iconSearch: {
        width: 20,
        height: 20,
    },
    searchBt: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textColumn: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    divider: {
        borderRightWidth: 1,
        borderColor: COLORS.white,
        height: '80%',
    },
    text1: {
        fontSize: 14,
        fontFamily: FONT.regular,
    },
    text2: {
        fontSize: 16,
        fontFamily: FONT.bold,
    },
});
