import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import icons from "../constants/icons";
import { useRouter } from "expo-router";
import { COLORS, FONT } from "../constants/theme";

const NavBar = ({ activePage, style }) => {
  const router = useRouter();

  const handleNotify = () => {
    router.push('/notification');
  };

  const handleHome = () => {
    router.push('/home');
  };

  const handleUser = () => {
    router.push('/user');
  };
  
  return (
    <View style={[styles.container, style]}>
        <TouchableOpacity onPress={handleHome}>
          <View style={styles.iconContainer}>
              <Image
                source={activePage === "home" ? icons.homeActive : icons.home}
                style={styles.icon}
              />
              <Text style={[styles.text, activePage === "home" && styles.activeText]}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotify}>
          <View style={styles.iconContainer}>
              <Image
                source={activePage === "notification" ? icons.bellActive : icons.bell}
                style={styles.icon}
              />
              <Text style={[styles.text, activePage === "notification" && styles.activeText]}>Notification</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUser}>
          <View style={styles.iconContainer}>
              <Image
                source={activePage === "user" ? icons.userActive : icons.user}
                style={styles.icon}
              />
              <Text style={[styles.text, activePage === "user" && styles.activeText]}>User</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: 16,
  },
  activeText: {
    color: COLORS.primary,
    fontFamily: FONT.bold,
  }
});

export default NavBar;
