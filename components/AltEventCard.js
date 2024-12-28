import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import AttendeePictures from "./AttendeePictures";

function AltEventCard({
  onPress,
  eventName,
  faculty,
  floor,
  room,
  image,
  eventDate,
  eventId,
}) {
  return (
    <View style={styles.container}>
      <Shadow
        sides={{ bottom: true, top: false, start: false, end: true }}
        corners={{
          topStart: false,
          topEnd: false,
          bottomStart: false,
          bottomEnd: true,
        }}
        offset={[0, 0]}
        distance={6}
        startColor="rgba(0, 0, 0, 0.20)"
        endColor="rgba(0, 0, 0, 0.05)"
      >
        <Pressable style={styles.card} onPress={onPress}>
          <View style={styles.cardInfo}>
            <Text style={styles.time}>{eventDate}</Text>
            <Text style={styles.title}>{eventName}</Text>
            <View style={styles.location}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.gray.dark}
              />
              <Text style={styles.locationText}>
                {/* Art's Faculty, Gallery - GF */}
                {faculty + "-" + floor + "-" + room}
              </Text>
            </View>
          </View>
          <AttendeePictures
            attendees={[
              "https://picsum.photos/100/100",
              "https://picsum.photos/200/100",
              "https://picsum.photos/400/300",
              "https://picsum.photos/100/100",
              "https://picsum.photos/100/100",
              "https://picsum.photos/100/100",
            ]}
            enableAttendeeCount={true}
          />
        </Pressable>
      </Shadow>
    </View>
  );
}

export default AltEventCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 6, // same amount as the distance of the shadow, cause it was getting cut off
  },
  card: {
    flexDirection: "row",
    minHeight: 136,
    width: 380,
    borderRadius: 8,
    justifyContent: "space-between",
    backgroundColor: Colors.background.surface,
  },
  cardInfo: {
    flex: 3,
    marginHorizontal: 14,
    marginVertical: 12,
  },
  time: {
    fontSize: 18,
    color: Colors.gray.light,
  },
  title: {
    fontSize: 24,
    color: Colors.accent.primary,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 6,
  },
  locationText: {
    fontSize: 18,
    color: Colors.gray.dark,
    margin: 0,
    marginLeft: 4,
    lineHeight: 20,
    maxWidth: 230,
  },
  attending: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  attendingImages: {
    flexDirection: "row",
    alignItems: "center",
    width: 68,
    height: 40,
  },
  attendingCount: {
    fontSize: 15,
    color: Colors.gray.light,
  },
});
