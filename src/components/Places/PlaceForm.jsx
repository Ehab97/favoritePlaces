import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import Colors from "../../utlis/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  const [title, setTitle] = useState("");

  const onChangeTitle = (text) => {
    setTitle(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={onChangeTitle} />
      </View>
      <ImagePicker />
      <LocationPicker/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
