import { StyleSheet, View, Text, Pressable } from "react-native";

import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

function LogIn() {
  return (
    <View style={styles.container}>
      <PlaceHolderIcon />

      <AuthTitle>Welcome Back</AuthTitle>

      <AuthTextInput placeholder="Email" />
      <AuthTextInput placeholder="Password" secureTextEntry />

      <AuthButton>Log In</AuthButton>

      <AuthRedirectButton>
        Don't have an account? {<BoldText>Sign Up</BoldText>}
      </AuthRedirectButton>

      <Pressable style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Pressable>
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  forgotPassword: {
    position: "absolute",
    bottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#000000",
  },
});
