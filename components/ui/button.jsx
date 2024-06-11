import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const buttonVariants = {
  primary: {
    backgroundColor: COLORS.primary,
    color: "white",
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    color: "black",
  },
  outline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "white",
    color: COLORS.primary,
  },
};

const Button = ({ variant, onPress, children, style, disabled }) => {
  const variantStyles = buttonVariants[variant] || buttonVariants.primary;
  const buttonOpacity = disabled ? 0.5 : 1; 

  const buttonStyles = [
    styles.button,
    { 
      backgroundColor: variantStyles.backgroundColor,
      borderColor: variantStyles.borderColor, 
      borderWidth: variantStyles.borderWidth,
    },
    Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid, // Chọn hiệu ứng bóng đổ dựa trên nền tảng
    style,
    { opacity: buttonOpacity }
  ];

  return (
    <TouchableOpacity
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled || false}
    >
      <Text style={[styles.text, { color: variantStyles.color }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  shadowAndroid: {
    elevation: 4,
  },
});

export default Button;
