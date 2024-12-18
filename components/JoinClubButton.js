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
      style={joinState ? styles.joinedButton : styles.joinButton}
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
  joinButton: {
    backgroundColor: Colors.accent.secondary,
    height: 28,
    // width: 167,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  joinedButton: {
    backgroundColor: Colors.background.base,
    height: 28,
    // width: 167,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.accent.secondary,
  },
  text: {
    fontSize: 16,
  },
});
