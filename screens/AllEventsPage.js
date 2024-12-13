import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";

function AllEventsPage() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

export default AllEventsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
});
