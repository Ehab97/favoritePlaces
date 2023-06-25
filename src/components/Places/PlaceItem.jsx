import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import Address from "./Address";
import Colors from "../../utlis/colors";

const PlaceItem = ({ place, onSelect }) => {

  return (
    <Pressable onPress={onSelect} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Address address={place.address} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    height: 100,
    minHeight: "100%",
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  },
});

export default PlaceItem;
