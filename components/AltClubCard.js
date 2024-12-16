import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

function AltClubCard({
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
                size={18}
                color={Colors.gray.dark}
              />
              <Text style={styles.locationText}>
                {/* Art's Faculty, Gallery - GF */}
                {faculty + "-" + floor + "-" + room}
              </Text>
            </View>
          </View>
          <View style={styles.attending}>
            <View style={styles.attendingImages}>
              <View
                style={[
                  styles.circle,
                  styles.circle3,
                  { left: 0, top: 0, zIndex: 3 },
                ]}
              />
              <View
                style={[
                  styles.circle,
                  styles.circle2,
                  { left: -17, top: 0, zIndex: 2 },
                ]}
              />
              <View
                style={[
                  styles.circle,
                  styles.circle1,
                  { left: -34, top: 0, zIndex: 1 },
                ]}
              />
            </View>
            <Text style={styles.attendingCount}>4 att.</Text>
          </View>
        </Pressable>
      </Shadow>
    </View>
  );
}

export default AltClubCard;

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
    paddingHorizontal: 14,
    paddingVertical: 12,
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
    alignItems: "center",
    paddingTop: 4,
  },
  locationText: {
    fontSize: 18,
    color: Colors.gray.dark,
    marginLeft: 4,
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
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  circle1: {
    backgroundColor: Colors.background.subtle,
  },
  circle2: {
    backgroundColor: Colors.gray.darkest,
  },
  circle3: {
    backgroundColor: Colors.gray.muted,
  },
  attendingCount: {
    fontSize: 15,
    color: Colors.gray.light,
  },
});
