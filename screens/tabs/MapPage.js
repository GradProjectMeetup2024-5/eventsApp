import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../src/constants/Colors";

function MapPage() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
});
