import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

const EnrollScreen = () => {
  return (
    <View>
      <TextInput
        style={styles.input}
        label="Name"
        mode="outlined"
        activeUnderlineColor="rgba(63,94,251,1)"
        left={<TextInput.Icon name="account" />}
      />
      <TextInput
        style={styles.input}
        label="Phone"
        keyboardType="phone-pad"
        activeUnderlineColor="rgba(63,94,251,1)"
        mode="outlined"
        left={<TextInput.Icon name="phone" />}
      />
      <TextInput
        style={styles.input}
        label="Address"
        right={<TextInput.Affix text="/100" />}
        activeUnderlineColor="rgba(63,94,251,1)"
        mode="outlined"
        left={<TextInput.Icon name="home" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 0,
  },
});

export default EnrollScreen;
