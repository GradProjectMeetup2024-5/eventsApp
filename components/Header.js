import { View, TextInput, Pressable, StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchbar}
        placeholder="Search"
        placeholderTextColor={Colors.gray.medium}
      />
      <Pressable style={styles.iconContainer} onPress={onPress}>
        <Ionicons
          name="person-outline"
          size={28}
          color={Colors.accent.secondary}
        />
      </Pressable>
    </View>
  );
};

export default Header;

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
  searchbar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.surface,
    paddingLeft: 15,
    color: Colors.gray.white,
  },
  iconContainer: {
    padding: 5,
    paddingLeft: 15,
  },
});
