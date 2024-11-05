import { TextInput, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function AuthTextInput({
  placeholder,
  placeholderTextColor = "#FFFFFF",
  secureTextEntry = false,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
    />
  );
}

export default AuthTextInput;

const styles = StyleSheet.create({
  input: {
    width: width - 32,
    height: 47,
    backgroundColor: "#AFB1B6",
    borderRadius: 24,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "#FFFFFF",
    // fontFamily: "WorkSans-Medium",
    fontSize: 16,
  },
});
