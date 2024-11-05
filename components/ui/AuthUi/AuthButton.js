import { Pressable, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function AuthButton({ children, onPress }) {
  return (
    <Pressable style={styles.authButton} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default AuthButton;

const styles = StyleSheet.create({
  buttonText: {
    color: "#FFFFFF",
    // fontFamily: "WorkSans-Medium",
    fontSize: 16,
  },
  authButton: {
    width: width - 32,
    height: 47,
    backgroundColor: "#19191B",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
