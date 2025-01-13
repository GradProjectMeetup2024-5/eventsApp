import { StyleSheet, View, Image } from "react-native";
import Colors from "../../../src/constants/Colors";
import AuthMessage from "./AuthMessage";

function AuthLayout({ children, message }) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.appLogo}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <View style={{ height: 200 }}></View>
        <AuthMessage>{message}</AuthMessage>
        {children}
      </View>
    </View>
  );
}

export default AuthLayout;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.base,
  },
  appLogo: {
    position: "absolute",
    top: 50,
  },
  logo: {
    width: 400,
    height: 400,
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    // marginTop: 100,
  },
});
