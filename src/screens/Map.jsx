import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
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

  return (
    <MapView style={styles.map} initialRegion={region} onPress={handleMapPress}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation?.lat ,
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
