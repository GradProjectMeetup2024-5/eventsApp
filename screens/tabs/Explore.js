import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import Header from "../../components/Header";

export default function Explore() {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("Profile");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={pressHandler} />
      <Text>Content goes here</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
});
