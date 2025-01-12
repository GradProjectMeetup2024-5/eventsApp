import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../API/action/auth";

import Colors from "../../src/constants/Colors";

import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

function LogIn({ navigation }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [displayEmail, setDisplayEmail] = useState("");
  const dispatch = useDispatch();

  async function handleLogin() {
    console.log("Login button pressed");
    try {
      const text = await dispatch(signin(formData));
      console.log("Stored Profile:", text);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  function handleForgotPass() {
    navigation.navigate("ForgotPassword");
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
        <AuthTitle>Back for more? Let's get you logged in!</AuthTitle>
        <AuthTextInput
          placeholder="Email"
          value={displayEmail}
          onChangeText={(text) => {
            setDisplayEmail(text);
            setFormData({ ...formData, email: text.toLowerCase().trim() });
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AuthTextInput
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <AuthButton onPress={handleLogin} textStyle={styles.whiteText}>
          Log In
        </AuthButton>

        <AuthRedirectButton onPress={handleSignUp} textStyle={styles.whiteText}>
          Don't have an account?{" "}
          {<BoldText style={styles.whiteText}>Sign Up</BoldText>}
        </AuthRedirectButton>

        <Pressable style={styles.forgotPassword} onPress={handleForgotPass}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.base,
  },
  appLogo: {},
  formContainer: {
    alignItems: "center",
    marginTop: 200,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: -90,
  },
  forgotPassword: {
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  whiteText: {
    color: "#FFFFFF",
  },
});
