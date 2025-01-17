import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../../src/constants/Colors";

import PosterDetails from "../PosterDetails";
import EventImage from "./EventImage";
import CustomShadow from "../CustomShadow";

export default function EventCard({
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventOrganizer,
  eventImage,
  onPress,
  faculty,
  logo,
  edit = false,
  eventId,
}) {
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

  function shareFunction() {}

  return (
    <CustomShadow>
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <EventImage
            imageSource={eventImage}
            shareFunction={shareFunction}
            edit={edit}
            eventId={eventId}
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.eventTitle}>{eventName}</Text>
            <View style={styles.eventDetailsContainer}>
              <Text style={styles.eventDetailsText}>
                {formatDate(eventDate)}
              </Text>
              <Text style={styles.eventDetailsText}> · </Text>
              <Text style={styles.eventDetailsText}>
                {formatTime(eventDate)}
              </Text>
              <Text style={styles.eventDetailsText}> · </Text>
              <Text style={styles.eventDetailsText}>{faculty}</Text>
            </View>
            <View
              style={[styles.posterContainer, { transform: [{ scale: 0.8 }] }]}
            >
              <PosterDetails creatorName={eventOrganizer} creatorImage={logo} />
              {/* <Text style={styles.eventOrganizer}>{eventOrganizer}</Text> */}
            </View>
          </View>
        </Pressable>
      </View>
    </CustomShadow>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 380,
    minHeight: 280,
    borderRadius: 12,
    backgroundColor: Colors.background.surface,
    overflow: "hidden",
    marginBottom: 8,
    zIndex: 0,
    // marginHorizontal: 16,
  },
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
  eventOrganizer: {
    fontSize: 12,
    color: "white",
    textAlign: "left",
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
  detailsContainer: {
    alignItems: "flex-start",
    marginVertical: 10,
    marginHorizontal: 16,
  },
  eventTitle: {
    color: Colors.accent.primary,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 25,
    maxWidth: 348,
  },
  eventDetailsContainer: {
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: 348,
  },
  eventDetailsText: {
    color: Colors.gray.light,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 20,
    flexWrap: "wrap",
    maxWidth: 160,
    textAlign: "center",
  },
  posterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -37,
  },
});
