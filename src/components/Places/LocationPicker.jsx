import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import OutlineButton from "../ui/OutlineButton";
import Colors from "../../utlis/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { getMapPreview } from "../../utlis/locations";

const LocationPicker = () => {
  const [pikedlocation, setPikedLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient permission!", "You need to grant location access to use this app");
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPikedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {};

  let locationPreview = <Text style={styles.previewText}>No location chosen yet</Text>;

  if (pikedlocation) {
    locationPreview = (
      <Image source={{ uri: getMapPreview(pikedlocation.lat, pikedlocation.lng) }} style={styles.imageStyle} />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton title="Locate User" iconName="location" onPress={getLocationHandler} />
        <OutlineButton title="Pick on Map" iconName="map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary100,
    marginVertical: 8,
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  previewText: {
    fontSize: 20,
    color: Colors.primary200,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
