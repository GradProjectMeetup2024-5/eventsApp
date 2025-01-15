import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function SubSectionHeader({
  selected = null,
  handlePressOne = null,
  handlePressTwo = null,
  one = null,
  two = null,
  title,
  backButton = false,
  subPageButtons = true,
}) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  function pressHandler() {
    navigation.navigate("Profile");
  }

  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          styles.titleContainer,
          { marginBottom: subPageButtons ? 0 : 10 },
        ]}
      >
        {backButton && (
          <Pressable style={styles.backButton} onPress={goBack}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={Colors.gray.light}
            />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
        {!backButton && (
          <Pressable style={styles.profileButton} onPress={pressHandler}>
            <Ionicons
              name="person-outline"
              size={28}
              color={Colors.accent.primary}
            />
          </Pressable>
        )}
      </View>
      {subPageButtons && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.subPageButtons,
              {
                backgroundColor:
                  selected === one
                    ? Colors.accent.secondary
                    : Colors.background.surface,
              },
            ]}
            onPress={handlePressOne}
          >
            <Text
              style={[
                styles.subButtonText,
                {
                  color:
                    selected === one
                      ? Colors.background.surface
                      : Colors.gray.light,
                },
              ]}
            >
              {one}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.subPageButtons,
              {
                backgroundColor:
                  selected === two
                    ? Colors.accent.secondary
                    : Colors.background.surface,
              },
            ]}
            onPress={handlePressTwo}
          >
            <Text
              style={[
                styles.subButtonText,
                {
                  color:
                    selected === two
                      ? Colors.background.surface
                      : Colors.gray.light,
                },
              ]}
            >
              {two}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default SubSectionHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.background.elevated,
    paddingTop: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginVertical: 8,
  },
  subPageButtons: {
    backgroundColor: Colors.background.muted,
    marginHorizontal: 2,
    height: 31,
    width: 130,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  subButtonText: {
    fontSize: 16,
    fontWeight: 500,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: { position: "absolute", left: 7 },
  profileButton: { position: "absolute", right: 0 },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.gray.light,
  },
});
