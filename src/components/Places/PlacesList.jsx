import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import Colors from "../../utlis/colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
  const navigations = useNavigation();

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>No places found. Maybe add one?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() => {
            navigations.navigate("PlaceDetails", { placeId: item.id });
          }}
        />
      )}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 20,
    color: Colors.primary200,
  },
});

export default PlacesList;
