import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import OutlineButton from "../ui/OutlineButton";
import Colors from "../../utlis/colors";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient permission!", "You need to grant camera access to use this app");
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets);
  };
  let imagePreview = <Text style={styles.previewText}>No image taken yet</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage[0].uri }} style={styles.imageStyle} />;
  }

  return (
    <View>
      <View style={styles.imagepreviewcontainer}>{imagePreview}</View>
      <OutlineButton
        title="Take Image"
        onPress={takeImageHandler}
        iconName="camera-outline"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  imagepreviewcontainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary100,
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {
    color: "#592454",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
