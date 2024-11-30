import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./Configure";

import Tabs from "./navigators/Tabs.js";
import LogIn from "./screens/auth/LogIn.js";
import SignUp from "./screens/auth/SignUp.js";
import ForgotPass from "./screens/auth/ForgotPass.js";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  // Access Redux state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
          <Stack.Screen name="Tabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
