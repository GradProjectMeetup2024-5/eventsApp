import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import Header from "../../components/Header";

function AttendingPage() {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("Profile");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={pressHandler} />
    </SafeAreaView>
  );
}
export default AttendingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
});
