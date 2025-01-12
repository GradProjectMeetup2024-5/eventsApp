import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";

import Colors from "../../src/constants/Colors";

function ForgotPass({ navigation }) {
  const [displayEmail, setDisplayEmail] = useState("");

  function handleBackToLogin() {
    navigation.goBack("SignUp");
  }
  return (
    <View style={styles.contentContainer}>
      <View style={styles.appLogo}>
        <Image
          source={require("../../assets/icon.png")}
          style={[styles.icon, { width: 300, height: 300 }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <AuthTitle>
          Need a reset? Enter your email, and we'll guide you back in no time!
        </AuthTitle>
        <AuthTextInput
          placeholder="Email"
          value={displayEmail}
          onChangeText={(text) => {
            setDisplayEmail(text);
            // setFormData({ ...formData, email: text.toLowerCase().trim() });
          }}
          style={styles.inputField}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AuthButton>Send</AuthButton>

        <AuthRedirectButton onPress={handleBackToLogin}>
          Already have an account? <BoldText>Log In</BoldText>
        </AuthRedirectButton>
      </View>
    </View>
  );
}

export default ForgotPass;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.base,
  },
  instructions: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  appLogo: {
    position: "absolute",
    top: 100,
  },
  icon: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
});
