import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../API/action/auth";

import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
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
    <ImageBackground
      source={require("../../assets/BG.png")}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/icon.png")}
          style={[styles.icon, { width: 300, height: 300 }]}
          resizeMode="contain"
        />

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
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={styles.inputField}
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
    </ImageBackground>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 0,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  inputField: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
});
