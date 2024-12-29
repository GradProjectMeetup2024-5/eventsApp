import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  myJoinedEvents,
  showMyCreatedEvents,
} from "../../API/action/eventUser";

import EventCard from "../../components/ui/EventCard";
import * as actionType from "../../API/actionTypes";

import Colors from "../../src/constants/Colors";
import SubSectionHeader from "../../components/SubSectionHeader";
import RefreshableScrollView from "../../components/RefreshableScrollView";
import { back } from "../../assets/eventplaceholder.png";

function AttendingPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const events = useSelector((state) => state.eventUser);
  const navigation = useNavigation();
  // console.log(events)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(myJoinedEvents({ type: actionType.MY_JOINED_EVENTS }));
      dispatch(showMyCreatedEvents({ type: actionType.MY_CREATED_EVENT }));
      setLoading(false);
    }, 2);

    return () => clearTimeout(timer);
  }, []);

  const one = "Attending";
  const two = "My Events";
  const [selector, setSelector] = useState(one);

  function handlePressAttending() {
    setSelector(one);
  }
  function handlePressMyEvents() {
    setSelector(two);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SubSectionHeader
        selected={selector}
        handlePressOne={handlePressAttending}
        handlePressTwo={handlePressMyEvents}
        one={one}
        two={two}
        title="Attending"
      />
      <ScrollView style={styles.container}>
        {/*turn this into a flatlist*/}

        {
          selector === one ? null : events?.length > 0 ? ( // MY EVENTS SUB-SECTION
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {events.map((event, index) => (
                <View key={index} style={{ marginBottom: 16 }}>
                  <EventCard
                    eventName={event?.event_name}
                    eventDate={event?.event_date}
                    eventLocation={event?.event_desc}
                    eventOrganizer={event?.userId}
                    eventImage={back}
                    profileImageSource={back}
                    textColor="#FFFFFF"
                    onPress={() =>
                      navigation.navigate("EventDetails", {
                        eventId: event?.id,
                        creatorName: event?.createrName,
                        eventName: event?.event_name,
                        eventDate: event?.event_date,
                        floor: event?.floor,
                        room: event?.room,
                        about: event?.event_desc,
                        image: event?.image,
                        faculty: event?.faculty,
                        joinedUsers: event?.joined_users,
                      })
                    }
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.emptyState}>
                <PlaceHolderIcon />
                <Text style={styles.emptyStateTitle}>No Events Scheduled</Text>
                <Text style={styles.emptyStateDescription}>
                  You don't have any listed events.
                </Text>
              </View>
            </ScrollView>
          )
          // this is where attending page rendering goes
        }
      </ScrollView>
    </SafeAreaView>
  );
}
export default AttendingPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  container: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: Colors.background.base,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
  },
  emptyStateTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: 0.16,
    color: "#FFFFFF",
  },
  emptyStateDescription: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: 0.16,
    color: "#FFFFFF",
    maxWidth: 307,
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
  },
  button: {
    backgroundColor: "#DC143C",
    borderRadius: 100,
    padding: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 24,
    color: "#FFFFFF",
  },
});
