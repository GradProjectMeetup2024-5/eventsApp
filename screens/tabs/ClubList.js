import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import Header from "../../components/Header";

function ClubList() {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("Profile");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={pressHandler} />
      <View style={styles.clubListContainer}>
        <View style={styles.cardInfo}>
          <Text>ahaa</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ClubList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  cardInfo: {
    paddingVertical: 55,
    paddingHorizontal: 170,
    marginVertical: 10,
    backgroundColor: Colors.background.surface,
    alignItems: "center", // Centers the content horizontally
    justifyContent: "flex-start", // Keeps content at the top (if you don't want vertical centering)
    flexDirection: "column", // Default behavior for text, vertical stacking
    borderRadius: 8,
    // elevation: 10,
  },
  clubListContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});
