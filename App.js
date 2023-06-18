import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllPlaces from "./src/screens/AllPlaces";
import AddPlace from "./src/screens/AddPlace";
import IconButton from "./src/components/ui/IconButton";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Places" component={AllPlaces} 
            options={{
              headerRight:({tintColor}) => {
                return (
                  <IconButton name="add" size={30} color={tintColor} onPress={() => {} } />
                )
              },
            }}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
