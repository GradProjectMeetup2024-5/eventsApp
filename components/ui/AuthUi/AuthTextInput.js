import { TextInput, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function AuthTextInput({
  placeholder,
  placeholderTextColor = "#FFFFFF",
  secureTextEntry = false,
  value,
  onChangeText,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

export default AuthTextInput;

const styles = StyleSheet.create({
  input: {
    width: width - 32,
    height: 47,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 20,
    marginBottom: 10,
    // color: "#FFFFFF",
    fontSize: 16,
  },
});
