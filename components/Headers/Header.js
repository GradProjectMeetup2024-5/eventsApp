import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../src/constants/Colors";
import { useNavigation } from "@react-navigation/native";

import BottomNavigation from "../ui/BottomNavigation";
import TabBar from "../ui/TabBar";

const Header = ({
  searchText,
  onSearchChange,
  activeTab,
  setActiveTab,
  clubList = false,
}) => {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("Profile");
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.searchbar}
          placeholder="Search"
          placeholderTextColor={Colors.gray.dark}
          value={searchText}
          onChangeText={onSearchChange}
        />
        <Pressable style={styles.profileButton} onPress={pressHandler}>
          <Ionicons
            name="person-outline"
            size={28}
            color={Colors.accent.primary}
          />
        </Pressable>
      </View>
      {!clubList && (
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      ;
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.background.elevated,
    paddingHorizontal: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  searchbar: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.background.surface,
    paddingLeft: 15,
    color: Colors.gray.light,
  },
  profileButton: {
    marginLeft: 10,
  },
});
