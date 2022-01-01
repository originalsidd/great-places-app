import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const PlacesStack = createStackNavigator();

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <PlacesStack.Navigator screenOptions={defaultNavigationOptions}>
        <PlacesStack.Screen
          name="Places"
          component={PlacesListScreen}
          options={{ headerTitle: "All Places" }}
        />
        <PlacesStack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={{ headerTitle: "" }}
        />
        <PlacesStack.Screen
          name="NewPlace"
          component={NewPlaceScreen}
          options={{ headerTitle: "Add a Place" }}
        />
        <PlacesStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerTitle: "Map of the Place" }}
        />
      </PlacesStack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
