import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { FONT } from "../../constants/theme";

const Carousel = ({ 
  initialValue, 
  onNumberChange, 
  arrowColor, 
  numberColor, 
  customStyle 
}) => {
  const [number, setNumber] = useState(initialValue || 0);

  const handleIncrease = () => {
    setNumber(number + 1);
    onNumberChange(number + 1)
  };

  const handleDecrease = () => {
    if (number > 0) {
      setNumber(number - 1);
      onNumberChange(number - 1)
    }
  };

  return (
    <View style={[styles.container, customStyle]}>
        <TouchableOpacity style={styles.button} onPress={handleDecrease}>
            <Text style = {[styles.arrow, {color: arrowColor || 'black'}]}>←</Text>
        </TouchableOpacity>
        <View style={styles.numberContainer}>
            <Text style = {[styles.number, {color: numberColor || 'black'}]}>{number}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleIncrease}>
            <Text style= {[styles.arrow, {color: arrowColor || 'black'}, {textAlign: 'center'}]}>→</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  numberContainer: {
    alignItems: "center", 
  },
  arrow: {
    fontSize: 30,
  },
  number: {
    fontSize: 20,
    fontFamily: FONT.semibold,
  },
});

export default Carousel;
