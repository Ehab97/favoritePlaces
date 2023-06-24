import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../../utlis/colors";

const LoadingOverlay = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  } else {
    return children;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary700,
  },
});
export default LoadingOverlay;
