import React, { useState, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const { navigation } = props;
  let initialLocation = null;
  try {
    initialLocation = props.route.params.initialLocation;
  } catch (e) {}
  let readonly = false;
  try {
    readonly = props.route.params.readonly;
  } catch (e) {}
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Choosen!",
        "You need to pick a location to save it.",
        [{ text: "Okay" }]
      );
      return;
    }
    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!readonly) {
          return (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={savePickedLocationHandler}
            >
              <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
          );
        }
      },
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
