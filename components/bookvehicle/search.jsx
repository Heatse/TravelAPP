import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import icons from "../../constants/icons";
import { COLORS } from "../../constants/theme";

const Search = ({ style, openFilter, setFilter }) => {
    return (
        <View style={[styles.inputWrapr, style]}>
            <TextInput
                style={styles.inputStyle}
                textDecorationLine="none"
                placeholderTextColor={"gray"}
                onSubmitEditing={() => {}}
                placeholder="Search Vehicle"
                onChangeText={(text) =>
                    setFilter((prev) => ({
                        ...prev,
                        brand: text === "" ? null : text,
                    }))
                }
            />
            <TouchableOpacity onPress={openFilter} style={styles.wrapFilter}>
                <Image style={styles.icon} source={icons.filter} />
            </TouchableOpacity>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    inputWrapr: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        backgroundColor: COLORS.white,
        borderRadius: 30,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 20,
        borderRadius: 30,
    },
    icon: {
        width: 14,
        height: 14,
    },
    wrapFilter: {
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
    },
});
