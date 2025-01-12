import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  myJoinedEvents,
  showMyCreatedEvents,
} from "../../API/action/eventUser";
import { groupEventsByMonth } from "../../utils/groupEventsByMonth";
// import moment from "moment";

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
  const myJoinedEvent = useSelector(
    (state) => state.eventUser.myJoinedEvents || []
  );
  const [groupedEvents, setGroupedEvents] = useState({});

  const fetchData = async () => {
    await dispatch(myJoinedEvents());
    await dispatch(showMyCreatedEvents({ type: actionType.MY_CREATED_EVENT }));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [selector]);

  useEffect(() => {
    if (myJoinedEvent.length > 0) {
      const grouped = groupEventsByMonth(myJoinedEvent);
      setGroupedEvents(grouped);
    }
  }, [myJoinedEvent]);

  const one = "Attending";
  const two = "My Events";
  const [selector, setSelector] = useState(one);

  function handlePressOne() {
    setSelector(one);
  }
  function handlePressTwo() {
    setSelector(two);
  }

  const noEventsMessage =
    selector === one
      ? "You haven't joined any events yet, time to find something exciting!"
      : "You're not hosting anything right now,\nready to make your mark?";

  const noEventsIcon = selector === one ? "rocket" : "footsteps";

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <SubSectionHeader
        selected={selector}
        handlePressOne={handlePressOne}
        handlePressTwo={handlePressTwo}
        one={one}
        two={two}
        title="Attending"
      />
      {loading ? (
        <SafeAreaView style={styles.safeArea}>
          <ActivityIndicator size="large" color={Colors.accent.secondary} />
        </SafeAreaView>
      ) : selector === one ? (
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
                    style={{ marginBottom: 12 }}
                    pageType={selector}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        )
      ) : (
        <ScrollView
          contentContainerStyle={[styles.container, { marginTop: 20 }]}
          overScrollMode="never"
        >
          {events?.length > 0 ? (
            events.map((event, index) => (
              <View key={event.id} style={styles.eventContainer}>
                <EventCard
                  eventName={event?.event_name}
                  faculty={event?.faculty}
                  floor={event?.floor}
                  room={event?.room}
                  image={event?.image}
                  eventDate={event?.event_date}
                  eventId={event?.id}
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
                  style={{ marginBottom: 12 }}
                />
                {index < events.length - 1 && <View style={styles.separator} />}
              </View>
            ))
          ) : (
            <NoEvents
              icon={noEventsIcon}
              message={noEventsMessage}
              location="Create"
              buttonText="Create Event"
            />
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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray.darkest,
    marginVertical: 12,
    marginHorizontal: 15,
  },
});
