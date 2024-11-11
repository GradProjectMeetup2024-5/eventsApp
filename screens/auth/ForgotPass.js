import { StyleSheet, View, Text } from "react-native";

import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

function ForgotPass({ navigation }) {
  function handleBackToLogin() {
    navigation.goBack("SignUp");
  }
  return (
    <View style={styles.container}>
      <PlaceHolderIcon />
      <AuthTitle>Forgot Password</AuthTitle>

      <Text style={styles.instructions}>
        Please enter your email for instructions on resetting your password.
      </Text>

      <AuthTextInput placeholder="Email" />
      <AuthButton>Send</AuthButton>

      <AuthRedirectButton onPress={handleBackToLogin}>
        Remembered your password? <BoldText>Log In</BoldText>
      </AuthRedirectButton>
    </View>
  );
}

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  instructions: {
    fontSize: 16,
    color: "#19191B",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
