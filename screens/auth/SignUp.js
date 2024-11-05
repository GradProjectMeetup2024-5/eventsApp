import { StyleSheet, View } from "react-native";

import PlaceHolderIcon from "../../components/ui/AuthUi/PlaceholderIcon";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

function SignUp() {
  return (
    <View style={styles.container}>
      <PlaceHolderIcon />

      <AuthTitle>Create Account</AuthTitle>

      <AuthTextInput placeholder="Email" />
      <AuthTextInput placeholder="Password" secureTextEntry />
      <AuthTextInput placeholder="Confirm Password" secureTextEntry />

      <AuthButton>Sign Up</AuthButton>

      <AuthRedirectButton>
        Already have an account? {<BoldText>Log In</BoldText>}
      </AuthRedirectButton>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
