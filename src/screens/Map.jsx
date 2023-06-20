import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleMapPress = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log(lat, lng, event);
    setSelectedLocation({
      lat,
      lng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location chosen!", "Please pick a location on the map", [{ text: "Okay" }]);
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLocation: selectedLocation,
    });
  }, [navigation,selectedLocation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton name="save" color={tintColor} onPress={savePickedLocationHandler} size={24} />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={handleMapPress}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation?.lat,
            longitude: selectedLocation?.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
