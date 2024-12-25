import { View, Pressable, Text, StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function DetailCardSection({
  iconName,
  primary,
  secondary,
  children,
  onPress,
}) {
  return (
    <Pressable style={styles.detailRow} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={32} color={Colors.accent.primary} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.primary}>{primary}</Text>
        <Text style={styles.secondary}>{secondary}</Text>
      </View>
      <View style={styles.endItemContainer}>{children}</View>
    </Pressable>
  );
}

export default DetailCardSection;

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  iconContainer: {
    backgroundColor: Colors.background.base,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "column",
  },
  endItemContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  primary: {
    marginHorizontal: 10,
    color: Colors.gray.light,
    fontSize: 16,
    fontWeight: 500,
  },
  secondary: {
    marginHorizontal: 10,
    color: Colors.gray.light,
    fontSize: 13,
    fontWeight: 400,
  },
});
