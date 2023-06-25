import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../utlis/colors";

export default function Address({ address }) {
  const strsingBeutify =
    address &&
    address
      .replaceAll("_", " ")
      .replaceAll(";", ", ")
      .replaceAll(",", ", ")
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll("=", " ")
      .replaceAll('"', "")
      .replaceAll("address", "")
      .replaceAll("  ", "");
  console.log("strsingBeutify", strsingBeutify);
  return (
    <View style={styles.container}>
      <Text style={styles.address}>Address: {strsingBeutify}</Text>
      {/* <Text style={styles.text}>Display name: {jsonString?.display_name}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.primary50,
    // padding: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // marginBottom: 10,
    // width:'90%',
    // alignSelf:'center'
  },
  address: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: Colors.gray700,
  },
});
