import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  myJoinedEvents,
  showMyCreatedEvents,
} from "../../API/action/eventUser";
import { groupEventsByMonth } from "../../utils/groupEventsByMonth";
import moment from "moment";

// import EventCard from "../../components/ui/EventCard";
import * as actionType from "../../API/actionTypes";

import Colors from "../../src/constants/Colors";
import SubSectionHeader from "../../components/Headers/SubSectionHeader";
// import { back } from "../../assets/eventplaceholder.png";
import AltEventCard from "../../components/Cards/AltEventCard";
import EventCard from "../../components/Cards/EventCard";
import NoEvents from "../../components/NoEvents";


function AttendingPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const events = useSelector((state) => state.eventUser || []);
  const myJoinedEvent = useSelector((state) => state.eventUser.myJoinedEvents || []);
  // console.log("events",events);
  const [groupedEvents, setGroupedEvents] = useState({});



  useEffect(() => {
      dispatch(myJoinedEvents());
      dispatch(showMyCreatedEvents({ type: actionType.MY_CREATED_EVENT }));
  }, []);

  useEffect(() => {
    if (myJoinedEvent.length > 0) {
      const grouped = groupEventsByMonth(myJoinedEvent);
      console.log("grouped",grouped);
      setGroupedEvents(grouped);
    }
  }, [myJoinedEvent]);

  const one = "Attending";
  const two = "My Events";
  const [selector, setSelector] = useState(one);

  function handlePressAttending() {
    setSelector(one);
  }
  function handlePressMyEvents() {
    setSelector(two);
  }

  const noEventsMessage =
    selector === one
      ? "You haven't joined any events yet, time to find something exciting!"
      : "You're not hosting anything right now,\nready to make your mark?";

  const noEventsIcon = selector === one ? "rocket" : "footsteps";

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
      {selector === one ? (
        Object.keys(groupedEvents).length === 0 ? (
          <NoEvents icon={noEventsIcon} message={noEventsMessage} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.container}
            overScrollMode="never"
          >
            {Object.keys(groupedEvents).map((month) => (
              <View key={month}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{month}</Text>
                </View>
                {groupedEvents[month].map((event) => (
                  <AltEventCard
                    key={event?.id}
                    eventName={event?.event_name}
                    faculty={event?.faculty}
                    floor={event?.floor}
                    room={event?.room}
                    image={event?.image}
                    eventDate={event?.event_date}
                    eventId={event?.id}
                    onPress={() => console.log(`Event ${event?.id} pressed`)}
                    style={{ marginBottom: 12 }}
                    pageType={selector}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        )
      ) : events?.length === 0 ? (
        <NoEvents
          icon={noEventsIcon}
          message={noEventsMessage}
          location="Create"
          buttonText="Create Event"
        />
      ) : (
        <ScrollView
          contentContainerStyle={[styles.container, { marginTop: 20 }]}
          overScrollMode="never"
        >
      {events?.length > 0 ? (
        events.map((event) => (
          <View key={event.id} style={styles.eventContainer}>
            <EventCard
              eventName={event?.event_name}
              faculty={event?.faculty}
              floor={event?.floor}
              room={event?.room}
              image={event?.image}
              eventDate={event?.event_date}
              eventId={event?.id}
              onPress={() => console.log(`Event ${event?.id} pressed`)}
              style={{ marginBottom: 12 }}
            />
          </View>
        ))
      ) : (
        <Text>No events available</Text>
      )}
        </ScrollView>
      )}
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
    marginTop: 10,
    paddingBottom: 24,
    backgroundColor: Colors.background.base,
  },
  eventContainer: {
    marginBottom: 10,
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
  dateContainer: {
    marginBottom: 12,
    marginTop: 14,
    marginLeft: 15,
  },
  date: {
    fontSize: 21,
    fontWeight: "500",
    color: Colors.accent.secondary,
  },
});
