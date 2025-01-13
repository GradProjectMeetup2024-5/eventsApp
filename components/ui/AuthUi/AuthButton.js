import { Pressable, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Colors from "../../../src/constants/Colors";

function AuthButton({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed ? [styles.authButton, styles.buttonPressed] : styles.authButton,
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default AuthButton;

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.background.surface,
    // fontFamily: "WorkSans-Medium",
    fontWeight: 600,
    fontSize: 18,
  },
  authButton: {
    width: width - 32,
    height: 47,
    backgroundColor: Colors.accent.secondary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonPressed: {
    opacity: 0.5, // should add some animation here
  },
});
