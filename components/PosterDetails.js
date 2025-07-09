import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

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
  const { width } = useWindowDimensions();
  const containerWidth = width < 411 ? 350 : 380;

  // Only pressable if inEventDetails and club
  const Container = inEventDetails && club ? Pressable : View;

  return (
    <View
      style={[
        styles.posterContainer,
        { width: containerWidth },
        !inEventDetails && { paddingHorizontal: 10 },
      ]}
    >
      <Container
        style={styles.navigationContainer}
        {...(inEventDetails && club && onPress && { onPress })}
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
      </Container>
      {club && (
        <View style={styles.joinButtonContaienr}>
          <JoinClubButton />
        </View>
      )}
    </View>
  );
}

export default PosterDetails;

const styles = StyleSheet.create({
  posterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 90,
  },
  posterImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray.darkest,
  },
  posterName: {
    fontSize: 18,
    marginHorizontal: 8,
    marginRight: 0,
    color: Colors.gray.light,
    width: 180,
  },
  joinButtonContaienr: {
    justifyContent: "center",
    width: 90,
  },
});
