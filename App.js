import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector, useDispatch } from "react-redux";

import store from "./Configure";

import Colors from "./src/constants/Colors";

import Tabs from "./navigators/Tabs";
import Profile from "./screens/Profile";
import ClubDetails from "./screens/ClubDetails";
import EventDetails from "./screens/EventDetails";

import LogIn from "./screens/auth/LogIn";
import SignUp from "./screens/auth/SignUp";
import ForgotPass from "./screens/auth/ForgotPass";

import { useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import * as actionType from "./API/actionTypes";
import AllEventsPage from "./screens/AllEventsPage";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.authData !== null);

   const fetchProfile = () => async (dispatch) => {
    try {
      const storedProfile = await SecureStore.getItemAsync('profile');
      if (storedProfile) {
      await  dispatch({
          type: actionType.AUTH,
          data: JSON.parse(storedProfile),
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };


  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // animation: "reveal_from_bottom",
        }}
      >
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
            <Stack.Screen name="ClubDetails" component={ClubDetails} />
            <Stack.Screen name="AllEvents" component={AllEventsPage} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
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
