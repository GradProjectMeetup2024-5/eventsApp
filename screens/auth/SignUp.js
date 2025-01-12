import { StyleSheet, View, Text, Image } from "react-native";
import { useContext, useState } from "react";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../API/action/auth";
import Colors from "../../src/constants/Colors";

function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [displayEmail, setDisplayEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  function handleSignUp() {
    dispatch(signup(formData));
  }

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
        <AuthTitle>Ready to join the fun? Let's get started!</AuthTitle>
        <AuthTextInput
          placeholder="Email"
          value={displayEmail}
          onChangeText={(text) => {
            setDisplayEmail(text);
            setFormData({ ...formData, email: text.toLowerCase().trim() });
          }}
          style={styles.inputField}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AuthTextInput
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <AuthTextInput
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        <AuthTextInput placeholder="Confirm Password" secureTextEntry />

        <AuthButton onPress={handleSignUp}>Sign Up</AuthButton>

        <AuthRedirectButton onPress={handleBackToLogin}>
          Already have an account? {<BoldText>Log In</BoldText>}
        </AuthRedirectButton>
      </View>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.base,
  },
  appLogo: {},
  icon: {
    width: 100,
    height: 100,
    marginBottom: -90,
  },
  formContainer: {
    alignItems: "center",
    marginTop: 200,
  },
});
