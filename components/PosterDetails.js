import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import JoinClubButton from "./JoinClubButton";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../src/constants/Colors";

function PosterDetails({
  creatorImage,
  isApproved,
  onPress = null,
  creatorName,
  club = false,
  inEventDetails = false,
}) {
  return (
    <View style={styles.posterContainer}>
      <Pressable
        style={styles.navigationContainer}
        onPress={() => {
          if (club && inEventDetails && onPress) {
            onPress();
          }
        }}
      >
        <Image
          style={styles.posterImage}
          source={{
            uri: creatorImage,
          }}
        />
        <Text style={styles.posterName}>{creatorName}</Text>

        {isApproved ? (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Colors.accent.secondary}
          />
        ) : (
          <View style={{ width: 24, height: 24 }} />
        )}
      </Pressable>
      {club && (
        <View style={styles.joinButtonContaienr}>
          <JoinClubButton />
        </View>
      )}
      ;
    </View>
  );
}

export default PosterDetails;

const styles = StyleSheet.create({
  posterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 400,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 90,
  },
  posterImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray.dark,
  },
  posterName: {
    fontSize: 18,
    marginHorizontal: 8,
    marginRight: 0,
    color: Colors.gray.light,
    width: 200,
  },
  joinButtonContaienr: {
    position: "absolute",
    left: 282,
    width: 90,
  },
});
