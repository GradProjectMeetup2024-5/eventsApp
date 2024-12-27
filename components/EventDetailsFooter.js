import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import SwipeButton from "./SwipeButton";

import Colors from "../src/constants/Colors";

function EventDetailsFooter() {
  const handleSwipeComplete = () => {
    console.log("Swiped!", "You completed the swipe.");
  };
  return (
    <View style={styles.footer}>
      <SwipeButton onSwipeComplete={handleSwipeComplete} />
    </View>
  );
}

export default EventDetailsFooter;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 62,
    backgroundColor: Colors.background.elevated,
    borderTopColor: Colors.gray.darkest,
    borderTopWidth: 1,
  },
});
