import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const dispatch = useDispatch();

  const titleHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const locationPickedHandler = useCallback((location) => {
    setLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title, image, location));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleHandler}
          value={title}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navProps={props}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          style={styles.button}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
