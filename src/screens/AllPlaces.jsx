import { View, Text } from "react-native";
import React, { useEffect,useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utlis/database";

const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const loadPlaces = async () => {
    const dbResult = await fetchPlaces();
    console.log("dbResult", dbResult);
    setLoadedPlaces(dbResult.rows._array);
  };
  useEffect(() => {
    if (isFocused) {
        loadPlaces();
    //   setLoadedPlaces((prevPlaces) => [...prevPlaces, route.params.place]);
    } 
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
