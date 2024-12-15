import { Text, StyleSheet } from "react-native";

function AuthTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default AuthTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
});
