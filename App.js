import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AllPlaces from "./src/screens/AllPlaces";
import AddPlace from "./src/screens/AddPlace";
import IconButton from "./src/components/ui/IconButton";
import Colors from "./src/utlis/colors";
import Map from "./src/screens/Map";
import { useEffect, useState } from "react";
import { init } from "./src/utlis/database";
import LoadingOverlay from "./src/components/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  const handleDBInit = async () => {
    try {
      await init();
      setDbInitialized(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleDBInit();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <LoadingOverlay isLoading={!dbInitialized}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: Colors.gray700,
              contentStyle: {
                backgroundColor: Colors.gray700,
              },
            }}
          >
            <Stack.Screen
              name="Places"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Favorite Places",
                headerRight: ({ tintColor }) => {
                  return (
                    <IconButton
                      name="add"
                      size={30}
                      color={tintColor}
                      onPress={() => navigation.navigate("AddPlace")}
                    />
                  );
                },
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{
                title: "Add a New Place",
              }}
            />
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={{
                title: "All Places",
              }}
            />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      </LoadingOverlay>
    </>
  );
}
