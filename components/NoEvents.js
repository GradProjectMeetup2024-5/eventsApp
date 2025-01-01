import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../src/constants/Colors";

function NoEvents({ icon, message, location, buttonText }) {
  const navigation = useNavigation();

  return (
    <View style={styles.noEventContainer}>
      <View style={styles.noEventIconContainer}>
        <Ionicons name={icon} size={120} color={Colors.accent.secondary} />
      </View>
      <Text style={styles.noEventText}>{message}</Text>
      <View style={styles.exploreButtonContainer}>
        <Pressable
          style={styles.exploreButton}
          onPress={() => navigation.navigate(location)}
        >
          <Text style={styles.exploreButtonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default NoEvents;

const styles = StyleSheet.create({
  noEventContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noEventIconContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.surface,
  },
  noEventText: {
    fontSize: 14,
    color: Colors.gray.light,
    textAlign: "center",
    lineHeight: 20,
    width: 300,
    height: 65,
    marginBottom: 250,
  },
  exploreButtonContainer: {
    width: 200,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray.darkest,
  },
  exploreButtonText: {
    color: Colors.gray.light,
    fontSize: 13,
  },
});
