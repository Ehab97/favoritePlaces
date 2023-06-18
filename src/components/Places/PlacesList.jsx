import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>No places found. Maybe add one?</Text>
      </View>
    );
  }

  return (
    <FlatList data={places} renderItem={({ item }) => <PlaceItem place={item} />} keyExtractor={(item) => item.id} />
  );
};

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 20,
  },
});

export default PlacesList;