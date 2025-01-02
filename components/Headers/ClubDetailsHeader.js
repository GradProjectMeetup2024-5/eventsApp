import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function ClubDetailsHeader({ title }) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={goBack}>
        <Ionicons
          name="arrow-back-outline"
          color={Colors.gray.light}
          size={30}
          style={styles.icons}
        />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Pressable>
        <Ionicons
          name="share-outline"
          color={Colors.gray.light}
          size={30}
          style={styles.icons}
        />
      </Pressable>
    </View>
  );
}

export default ClubDetailsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background.elevated,
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: Colors.accent.primary,
  },
  icons: {
    paddingHorizontal: 8,
  },
});
