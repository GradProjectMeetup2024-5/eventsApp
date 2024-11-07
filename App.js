import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TabsComponent from "./components/ui/TabsComponent.js";
import Tabs from "./navigators/Tabs.js";

import LogIn from "./screens/auth/LogIn.js";
import SignUp from "./screens/auth/SignUp.js";
import ForgotPass from "./screens/auth/ForgotPass.js";
import Bookmarks from "./screens/tabs/Bookmarks.js";
import Profile from "./screens/tabs/Profile.js";

export default function App() {
  return (
    // <SafeAreaProvider>
    <NavigationContainer>
      {/* <Profile /> */}
      <Tabs />
      {/* <TabsComponent /> */}
    </NavigationContainer>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
