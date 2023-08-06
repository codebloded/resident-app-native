import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function StyledCamButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="camera" size={40} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    backgroundColor: "rgba(63,94,251,1)",

    borderRadius: 40,
    height: 75,
    width: 75,
    bottom: 28,
    borderWidth: 10,
  },
});
