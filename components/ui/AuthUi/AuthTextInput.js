import { TextInput, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Colors from "../../../src/constants/Colors";

function AuthTextInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  autoCapitalize = null,
  keyboardType = null,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray.dark}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      color={Colors.gray.light}
    />
  );
}

export default AuthTextInput;

const styles = StyleSheet.create({
  input: {
    width: width - 32,
    height: 47,
    backgroundColor: Colors.background.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
  },
});
