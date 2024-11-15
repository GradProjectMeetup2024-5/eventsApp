import { StyleSheet, Pressable, View, Text } from "react-native";

function ButtonItem({ icon, children, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.text}>{children}</Text>
      <View style={styles.chevron} />
    </Pressable>
  );
}

export default ButtonItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  icon: {
    width: 32,
    height: 32,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#000000",
    marginLeft: 8,
    flex: 1,
  },
  chevron: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#000000",
    transform: [{ rotate: "45deg" }],
  },
});
