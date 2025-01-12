import { View, Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

function EventCardButton({ onPress, icon, color }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <Ionicons name={icon} size={25} color={color} />
      </View>
    </Pressable>
  );
}

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
