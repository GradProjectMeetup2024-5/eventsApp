import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SwipeButton = ({ onSwipeComplete }) => {
  const slideBarWidth = useRef(new Animated.Value(100)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderMove: (_, { dx }) => {
      const progress = Math.max(0, Math.min(dx / 300, 1));
      const width = 100 - progress * 87;
      slideBarWidth.setValue(width);
    },
    onPanResponderRelease: (_, { dx }) => {
      if (dx > 160) {
        Animated.timing(slideBarWidth, {
          toValue: 13,
          duration: 200,
          useNativeDriver: false,
        }).start(() => onSwipeComplete?.());
      } else {
        Animated.parallel([
          Animated.spring(slideBarWidth, {
            toValue: 100,
            useNativeDriver: false,
          }),
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slideBar,
          {
            width: slideBarWidth.interpolate({
              inputRange: [13, 100],
              outputRange: ["13%", "100%"],
            }),
          },
        ]}
      >
        <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
          Swipe to Attend
        </Animated.Text>
        <View {...panResponder.panHandlers} style={styles.slider}>
          <Ionicons
            name="arrow-forward-outline"
            color={Colors.gray.light}
            size={28}
            style={styles.icon}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 385,
    height: 50,
    alignItems: "flex-end",
  },
  slideBar: {
    borderRadius: 25,
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: Colors.background.surface,
    height: 50,
  },
  text: {
    fontSize: 15,
    position: "absolute",
    alignSelf: "center",
    color: Colors.gray.muted,
  },
  slider: {
    position: "absolute",
    marginLeft: 2,
    width: 46,
    height: 46,
    backgroundColor: Colors.accent.secondary,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeButton;
