import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"; // Ensure you have this package installed
import { useNavigation } from "@react-navigation/native";

const EventCardButton = ({ icon, color, eventId }) => {
  const navigation = useNavigation();
  console.log("eventId FFFFF",eventId)
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Edit", {
          eventId:eventId, 
        })
      }
    >
      <View style={styles.button}>
        <Ionicons name={icon} size={25} color={color} />
      </View>
    </Pressable>
  );
};

export default EventCardButton;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(29, 29, 29, 0.8)",
    marginRight: 5,
  },
});
