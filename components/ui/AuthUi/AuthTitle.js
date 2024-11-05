import { Text, StyleSheet } from "react-native";

function AuthTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default AuthTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
