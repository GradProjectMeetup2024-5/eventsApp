import { StyleSheet, View, Text, Pressable, StatusBar, ImageBackground, Image } from "react-native";
import AuthContext from "../../context/AuthContext";

import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../API/action/auth'

import * as SecureStore from 'expo-secure-store';

import React, { useState, useEffect } from 'react';

// import * as actionType from '../../API/actionTypes';

function LogIn({ navigation }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [storedProfile, setStoredProfile] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const profile = await SecureStore.getItemAsync('profile');
  //       setStoredProfile(profile ? JSON.parse(profile) : null);
  //     } catch (error) {
  //       console.error('Error fetching stored profile:', error);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

  async function handleLogin() {
    console.log('Login button pressed'); // Debug log
    try {
      const text = await dispatch(signin(formData));
      console.log('Stored Profile:', text);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  function handleForgotPass() {
    navigation.navigate('ForgotPassword');
  }

  return (
    <ImageBackground source={require('../../assets/BG.png')} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.contentContainer}>
        <Image source={require('../../assets/icon.png')} style={[styles.icon, { width: 300, height: 300 }]} resizeMode="contain" />

        <AuthTextInput
          placeholder="Email"
          placeholderTextColor="#000000"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          style={styles.inputField}
        />
        <AuthTextInput
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={styles.inputField}
        />

        <AuthButton onPress={handleLogin} textStyle={styles.whiteText}>Log In</AuthButton>

        <AuthRedirectButton onPress={handleSignUp} textStyle={styles.whiteText}>
          Don't have an account? {<BoldText style={styles.whiteText}>Sign Up</BoldText>}
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
    width: '100%',
  },
});
