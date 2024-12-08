import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./Configure";

import Colors from "./src/constants/Colors";

import Tabs from "./navigators/Tabs.js";
import Profile from "./screens/Profile";
import LogIn from "./screens/auth/LogIn.js";
import SignUp from "./screens/auth/SignUp.js";
import ForgotPass from "./screens/auth/ForgotPass.js";

import { useContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.authData !== null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = await SecureStore.getItemAsync("profile");
        if (storedProfile) {
          dispatch({ type: actionType.AUTH, data: JSON.parse(storedProfile) });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPass} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" backgroundColor={Colors.background.elevated} />
        <>
          <AppNavigator />
        </>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
