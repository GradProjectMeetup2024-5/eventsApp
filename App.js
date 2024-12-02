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

import { useContext, useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  // Access Redux state
  const isLoggedIn = useSelector((state) => state.auth);
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   console.log({"user":user})
 
   useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    if (storedProfile) {
      setUser(storedProfile);
    }
  }, [isLoggedIn]); 


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user?.access_token ? (
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
        <>
       <AppNavigator/>
        </>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
