import { Text, StyleSheet } from "react-native";
import Colors from "../../../src/constants/Colors";

function AuthMessage({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default AuthMessage;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: Colors.gray.light,
    textAlign: "center",
  },
});
