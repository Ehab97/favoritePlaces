import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../utlis/colors";
import { beautifyAddress } from "../../utlis/helper";

export default function Address({ address }) {

  return (
    <View style={styles.container}>
      <Text style={styles.address}>Address: {beautifyAddress(address)}</Text>
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
