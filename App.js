import { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthContext from "./context/AuthContext";
import Tabs from "./navigators/Tabs.js";

import LogIn from "./screens/auth/LogIn.js";
import SignUp from "./screens/auth/SignUp.js";
import ForgotPass from "./screens/auth/ForgotPass.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <>
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPass} />
              </>
            ) : (
              <Stack.Screen name="Tabs" component={Tabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
