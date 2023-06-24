import { StyleSheet } from "react-native";
import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utlis/database";

const AddPlace = ({ navigation }) => {
  const handleInsterPlace = async (place) => {
    try {
      const res = await insertPlace(place);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };
  const createPlaceHandler = async (place) => {
    await handleInsterPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePleace={createPlaceHandler} />;
};

const styles = StyleSheet.create({});

export default AddPlace;
