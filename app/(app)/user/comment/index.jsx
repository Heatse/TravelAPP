import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../../constants/theme'
import icons from '../../../../constants/icons'

const Comment = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapr}>
                <TextInput
                    style={styles.inputStyle}
                    textDecorationLine="none"
                    placeholderTextColor={'gray'}
                    onSubmitEditing={() => { }}
                    placeholder="comment here"
                />
                <TouchableOpacity style={styles.wrapFilter}><Image style={styles.icon} source={icons.upload} /></TouchableOpacity>
            </View>
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: '100%',
        height: '100%',

    },

    inputWrapr: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        backgroundColor: COLORS.gray,
        borderRadius: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 20,
        borderRadius: 30,
    },
    icon: {
        width: 40,
        height: 40,
    },
    wrapFilter: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})