import { Pressable, Text, StyleSheet } from "react-native";

function AuthRedirectButton({ children, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default AuthRedirectButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  text: {
    color: "#FFFFFF",
  },
});
