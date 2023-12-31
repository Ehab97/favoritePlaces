import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import OutlineButton from "../ui/OutlineButton";
import Colors from "../../utlis/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { getAddressesFromCoords, getMapPreview } from "../../utlis/locations";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { flattenObject } from "../../utlis/helper";

const LocationPicker = ({ onPickeLocation }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [pickedlocation, setpickedlocation] = useState(null);
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
    console.log("getCurrentPositionAsync", location);
    setpickedlocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text style={styles.previewText}>No location chosen yet</Text>;

  if (pickedlocation) {
    locationPreview = (
      <Image source={{ uri: getMapPreview(pickedlocation.lat, pickedlocation.lng) }} style={styles.imageStyle} />
    );
  }

  React.useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params.pickedLocation;
      setpickedlocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const handleLocation = async () => {
    const address = await getAddressesFromCoords(pickedlocation.lat, pickedlocation.lng);

    onPickeLocation({
      ...pickedlocation,
      address,
    });
    console.log("address", address);
    console.log("pickedlocation", pickedlocation);
  };

  React.useEffect(() => {
    if (pickedlocation) {
      handleLocation();
    }
  }, [pickedlocation, onPickeLocation]);

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
