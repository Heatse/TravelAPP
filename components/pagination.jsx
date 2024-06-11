import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/theme";
import PropTypes from "prop-types";

const Pagination = ({ data, activeIndex, style }) => {
    return ( 
        <View style={[styles.pagination, style]}>
            {data.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={[
                            styles.circle,
                            index === activeIndex ? styles.activeCircle : null,
                        ]}
                    ></View>
                )
            })}
        </View>
    );
}

Pagination.propTypes = {
    data: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    style: PropTypes.object,
};

export default Pagination;

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    circle: {
        borderRadius: 50,
        backgroundColor: COLORS.gray,
        width: 11,
        height: 11,
        marginHorizontal: 5,
    },
    activeCircle: {
        backgroundColor: COLORS.primary,
    },
});
