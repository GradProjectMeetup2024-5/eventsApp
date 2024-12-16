import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../src/constants/Colors";

function AttendingHeader({ oneIsSelected, handlePressOne, handlePressTwo }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.subPageButtons,
            {
              backgroundColor: oneIsSelected
                ? Colors.background.surface
                : Colors.background.muted,
            },
          ]}
          onPress={handlePressOne}
        >
          <Text style={styles.subButtonText}>Attending</Text>
        </Pressable>
        <Pressable
          style={[
            styles.subPageButtons,
            {
              backgroundColor: oneIsSelected
                ? Colors.background.muted
                : Colors.background.surface,
            },
          ]}
          onPress={handlePressTwo}
        >
          <Text style={styles.subButtonText}>My Events</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AttendingHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.background.elevated,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
  },
  buttonContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    // marginHorizontal,: 0,
    justifyContent: "center",
  },
  subPageButtons: {
    backgroundColor: Colors.background.muted,
    marginVertical: 15,
    marginHorizontal: 2,
    paddingHorizontal: 30,
    paddingVertical: 3,
    borderRadius: 8,
  },
  subButtonText: {
    fontSize: 16,
    color: Colors.gray.light,
  },
});
