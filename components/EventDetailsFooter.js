import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import SwipeButton from "./SwipeButton";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../src/constants/Colors";

function EventDetailsFooter() {
  const [isAttending, setIsAttending] = useState(false);

  const handleSwipeComplete = () => {
    setIsAttending(true);
  };
  const handleCancelAttend = () => {
    setIsAttending(false);
  };

  return (
    <View style={styles.footer}>
      {isAttending ? (
        <View style={styles.attendingContainer}>
          <View style={styles.cancelContainer}>
            <Text style={[styles.text, { fontSize: 16, fontWeight: 500 }]}>
              You're Attending!
            </Text>
            <Pressable onPress={handleCancelAttend}>
              <Text style={styles.cancelText}>Cancel Attendance</Text>
            </Pressable>
          </View>
          <Pressable>
            <View style={styles.shareButton}>
              <Ionicons
                name="share-outline"
                color={Colors.gray.light}
                size={20}
                style={styles.icon}
              />
              <Text style={styles.text}> Share</Text>
            </View>
          </Pressable>
        </View>
      ) : (
        <SwipeButton onSwipeComplete={handleSwipeComplete} />
      )}
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
    height: 72,
    paddingBottom: 3,
    backgroundColor: Colors.background.elevated,
    borderTopColor: Colors.gray.darkest,
    borderTopWidth: 1,
  },
  attendingContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  shareButton: {
    flexDirection: "row",
    width: 160,
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.background.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.gray.light,
  },
  cancelContainer: {
    justifyContent: "space-between",

    height: 48,
  },
  cancelText: {
    color: Colors.accent.secondary,
  },
});
