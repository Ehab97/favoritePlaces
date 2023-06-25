import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import OutlineButton from "../components/ui/OutlineButton";

import { fetchPlaceById } from "../utlis/database";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { beautifyAddress } from "../utlis/helper";
import Colors from "../utlis/colors";

const PlaceDetails = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState(null);
  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  };

  const placeId = route.params?.placeId;
  const loadPlace = async (id) => {
    console.log("id", id);
    setLoading(true);
    try {
      const res = await fetchPlaceById(id);
      console.log("res", res);
      setPlace(res);
      navigation.setOptions({ title: res.title });
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    console.log("placeId", placeId);
    if (placeId) {
      loadPlace(placeId);
    }
  }, [placeId]);

  return (
    <ScrollView>
      <LoadingOverlay isLoading={loading}>
        <Image style={styles.image} source={{ uri: place?.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}> {beautifyAddress(place?.address)}</Text>
          </View>
          <OutlineButton title="Show on map" iconName="map" onPress={showOnMapHandler} />
        </View>
      </LoadingOverlay>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {},
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetails;
