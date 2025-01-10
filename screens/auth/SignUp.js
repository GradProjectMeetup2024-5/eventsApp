import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { useContext, useState } from "react";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../API/action/auth";

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
    <ImageBackground
      source={require("../../assets/BG.png")}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/icon.png")}
          style={[styles.icon, { width: 300, height: 300 }]}
          resizeMode="contain"
        />

        <AuthTitle>Create Account</AuthTitle>

        <AuthTextInput
          placeholder="Email"
          placeholderTextColor="#000000"
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
          placeholderTextColor="#000000"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <AuthTextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#000000"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        <AuthTextInput
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#000000"
        />

        <AuthButton onPress={handleSignUp}>Sign Up</AuthButton>

        <AuthRedirectButton onPress={handleBackToLogin}>
          Already have an account? {<BoldText>Log In</BoldText>}
        </AuthRedirectButton>
      </View>
    </ImageBackground>
  );
}

export default SignUp;

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
  icon: {
    width: 100,
    height: 100,
    marginBottom: 200,
  },
});
