
import { StyleSheet, View, Text, Pressable } from "react-native";
import AuthContext from "../../context/AuthContext";

import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import AuthTitle from "../../components/ui/AuthUi/AuthTitle";
import AuthTextInput from "../../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../../components/ui/AuthUi/AuthButton";
import AuthRedirectButton from "../../components/ui/AuthUi/AuthRedirectButton";
import BoldText from "../../components/ui/BoldText";

import { useDispatch, useSelector } from 'react-redux';
import {signin}  from '../../API/action/auth'

import * as SecureStore from 'expo-secure-store';

import React, { useState, useEffect } from 'react';

import * as actionType from '../../API/actionTypes';

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
      console.log('Stored Profile:',text);
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
    <View style={styles.container}>
      <PlaceHolderIcon />

      <AuthTitle>Welcome Back</AuthTitle>

      <AuthTextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <AuthTextInput
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />

      <AuthButton onPress={handleLogin}>Log In</AuthButton>

      <AuthRedirectButton onPress={handleSignUp}>
        Don't have an account? {<BoldText>Sign Up</BoldText>}
      </AuthRedirectButton>

      <Pressable style={styles.forgotPassword} onPress={handleForgotPass}>
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
