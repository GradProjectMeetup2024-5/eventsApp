import { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Tabs from "./navigators/Tabs.js";

import LogIn from "./screens/auth/LogIn.js";
import SignUp from "./screens/auth/SignUp.js";
import ForgotPass from "./screens/auth/ForgotPass.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  let screen = <LogIn onLogIn={handleLogin} />;

  if (isLoggedIn) {
    screen = <Tabs />;
  }

  return (
    // <SafeAreaProvider>
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        {/* <Profile /> */}
        {screen}
        {/* <TabsComponent /> */}
      </NavigationContainer>
    </>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
