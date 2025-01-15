import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AttendeePictures from "../AttendeePictures";
import EventCardButton from "../EventCardButton";
import Colors from "../../src/constants/Colors";

function EventImage({ imageSource, shareFunction, edit = false }) {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: imageSource,
        }}
        style={styles.image}
        defaultSource={require("../../assets/icon.png")}
      />
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0.8)",
          "rgba(0, 0, 0, 0.3)",
          "rgba(0, 0, 0, 0)",
        ]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.gradientOverlay}
      />

      <View style={[styles.attendeeContainer, { transform: [{ scale: 0.9 }] }]}>
        <AttendeePictures
          enableAttendeeCount={true}
          attendees={[
            "https://picsum.photos/100/300",
            "https://picsum.photos/200/100",
            "https://picsum.photos/100/100",
            "https://picsum.photos/300/100",
            "https://picsum.photos/300/150",
          ]}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <EventCardButton
          icon="share-outline"
          color={Colors.gray.light}
          onPress={shareFunction}
        />
        {edit && (
          <EventCardButton
            icon="create-outline"
            color={Colors.accent.secondary}
          />
        )}
      </View>
    </View>
  );
}

export default EventImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.background.elevated,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: "50%",
  },
  attendeeContainer: {
    position: "absolute",
    bottom: -3,
    left: -5,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    right: 0,
    marginTop: 5,
    marginRight: 0,
  },
});
