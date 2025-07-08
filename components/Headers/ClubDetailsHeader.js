import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function ClubDetailsHeader({ title }) {
  const { width } = useWindowDimensions();
  const titleMaxWidth = width < 361 ? 238 : 268;
  const fontSize = width < 361 ? 21 : width < 411 ? 23 : 24;

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

      <View style={[styles.titleContainer, { maxWidth: titleMaxWidth }]}>
        <Text style={[styles.title, { fontSize: fontSize }]}>{title}</Text>
      </View>
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
    minHeight: 60,
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    paddingVertical: 8,
    color: Colors.accent.primary,
  },
  icons: {
    paddingHorizontal: 8,
  },
});
