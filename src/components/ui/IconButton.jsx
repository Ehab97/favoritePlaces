import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const IconButton = ({ name, color, size, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
