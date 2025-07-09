import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import Colors from "../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomShadow from "../CustomShadow";
import AttendeePictures from "../AttendeePictures";

function AltEventCard({
  onPress,
  eventName,
  faculty,
  floor,
  room,
  image,
  eventDate,
  eventId,
  style,
  pageType = null,
  noEvents = false,
  attendeeCount = 0,
  joined_users,
}) {
  const { width } = useWindowDimensions();
  const cardWidth = width < 411 ? 360 : 380;
  const maxWidth = width < 411 ? 205 : 228;

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }

  const formatDate = (eventDate) => {
    const event = new Date(eventDate);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    if (event.toDateString() === today.toDateString()) {
      return "Today";
    } else if (event.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      const dayOfMonth = event.getDate();
      const month = months[event.getMonth()];
      const suffix = getDaySuffix(dayOfMonth);
      return `${dayOfMonth}${suffix} of ${month}`;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <CustomShadow>
        <Pressable
          style={[styles.card, { width: cardWidth }]}
          onPress={onPress}
        >
          {!noEvents ? (
            <>
              <View style={styles.cardInfo}>
                <View style={styles.eventDetailsContainer}>
                  <Text style={styles.eventDetailsText}>
                    {formatDate(eventDate)}
                  </Text>
                  <Text style={styles.eventDetailsText}> · </Text>
                  <Text style={styles.eventDetailsText}>
                    {formatTime(eventDate)}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.title,
                    {
                      color:
                        pageType == "History"
                          ? Colors.gray.muted
                          : Colors.accent.primary,
                    },
                  ]}
                >
                  {eventName}
                </Text>
                <View style={styles.location}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={Colors.gray.dark}
                  />
                  <Text style={[styles.locationText, { maxWidth }]}>
                    {faculty + "-" + floor + "-" + room}
                  </Text>
                </View>
              </View>
              <View style={styles.attendeeContainer}>
                <AttendeePictures
                  attendees={attendeeCount}
                  enableAttendeeCount={true}
                  pageType={pageType}
                  joined_users={joined_users}
                />
              </View>
            </>
          ) : (
            <View style={styles.noEventsCard}>
              <Text style={styles.noEventsText}>
                No events at the moment, stay tuned!
              </Text>
            </View>
          )}
        </Pressable>
      </CustomShadow>
    </View>
  );
}

export default AltEventCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 6, // same amount as the distance of the shadow, cause it was getting cut off in clubDetails
  },
  card: {
    flexDirection: "row",
    minHeight: 136,
    // width: 380,
    borderRadius: 8,
    justifyContent: "space-between",
    backgroundColor: Colors.background.surface,
  },
  noEventsCard: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  noEventsText: {
    fontSize: 15,
    color: Colors.gray.muted,
  },
  cardInfo: {
    flex: 3,
    marginHorizontal: 14,
    marginVertical: 12,
  },
  eventDetailsContainer: {
    flexDirection: "row",
  },
  eventDetailsText: {
    fontSize: 18,
    color: Colors.gray.light,
    maxWidth: 160,
  },
  title: {
    fontSize: 24,
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
  },
  attendeeContainer: {
    position: "absolute",
    right: 2,
    bottom: 0,
    zIndex: 1,
  },
});
