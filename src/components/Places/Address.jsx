import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../utlis/colors";

export default function Address(props) {
  const { address, addresstype, category, display_name } = props.address;

  // Check if address property exists
  const addressLine = address
    ? `${address.village ?? ""}, ${address.state ?? ""}, ${address.postcode ?? ""}, ${address.country ?? ""}`
    : "Address not available";

  return (
    <View style={styles.container}>
      <Text style={styles.address}>Address: {addressLine}</Text>
      <Text style={styles.text}>Display name: {display_name}</Text>
      {/* <Text style={styles.label}>Address type: {addresstype}</Text>
      <Text style={styles.label}>Category: {category}</Text> */}
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
  text:{
    fontSize:16,
   color:Colors.gray700,
  }
});
