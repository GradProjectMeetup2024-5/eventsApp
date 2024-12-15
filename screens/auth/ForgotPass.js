import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

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
    <ImageBackground source={require('../../assets/BG.png')} style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('../../assets/icon.png')} style={[styles.icon, { width: 300, height: 300 }]} resizeMode="contain" />

        <Text style={styles.instructions}>
          Please enter your email for instructions on resetting your password.
        </Text>

        <AuthTextInput placeholder="Email" placeholderTextColor="#000000" />
        <AuthButton>Send</AuthButton>

        <AuthRedirectButton onPress={handleBackToLogin}>
          Already have an account? <BoldText>Log In</BoldText>
        </AuthRedirectButton>
      </View>
    </ImageBackground>
  );
}

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  contentContainer: {
    alignItems: "center",
  },
  instructions: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: -80,
  },
});
