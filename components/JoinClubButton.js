import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";

function JoinClubButton() {
  const [joinState, setJoinState] = useState(false);

  function joinHandler() {
    setJoinState(!joinState);
  }
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: joinState
            ? Colors.background.base
            : Colors.accent.secondary,
          borderWidth: joinState ? 1 : 0,
          borderColor: Colors.accent.secondary,
        },
      ]}
      onPress={joinHandler}
    >
      <Text
        style={[
          styles.text,
          {
            color: joinState ? Colors.accent.secondary : Colors.gray.white,
          },
        ]}
      >
        {joinState ? "Joined" : "Join"}
      </Text>
    </Pressable>
  );
}

export default JoinClubButton;

const styles = StyleSheet.create({
  button: {
    height: 28,
    // width: 167,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
  },
});
