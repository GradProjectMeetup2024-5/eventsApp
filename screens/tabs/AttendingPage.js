import React, { useEffect, useMemo, useState } from "react";
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

import Colors from "../../src/constants/Colors";
import SubSectionHeader from "../../components/Headers/SubSectionHeader";
import AltEventCard from "../../components/Cards/AltEventCard";
import EventCard from "../../components/Cards/EventCard";
import NoEvents from "../../components/NoEvents";

const AttendingPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [selector, setSelector] = useState("Attending");

  const events = useSelector((state) => state.eventUser || []);
  const myJoinedEvent = useSelector(
    (state) => state.eventUser.myJoinedEvents || []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selector === "Attending") {
          await dispatch(myJoinedEvents());
        } else {
          await dispatch(showMyCreatedEvents());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selector, dispatch]);

  const groupedEvents = useMemo(() => {
    if (myJoinedEvent.length > 0) {
      return groupEventsByMonth(myJoinedEvent);
    }
    return {};
  }, [myJoinedEvent]);

  const noEventsMessage =
    selector === "Attending"
      ? "You haven't joined any events yet, time to find something exciting!"
      : "You're not hosting anything right now,\nready to make your mark?";
  const noEventsIcon = selector === "Attending" ? "rocket" : "footsteps";

  return (
    <SafeAreaView style={styles.safeArea}>
      <SubSectionHeader
        selected={selector}
        handlePressOne={() => setSelector("Attending")}
        handlePressTwo={() => setSelector("My Events")}
        one="Attending"
        two="My Events"
        title="Attending"
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 15 }}
          color={Colors.accent.secondary}
        />
      ) : selector === "Attending" ? (
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
          {events.length > 0 ? (
            events.map((event, index) => (
              <View key={event.id} style={styles.eventContainer}>
                <EventCard
                  edit={true}
                  eventName={event?.event_name}
                  eventDate={event?.event_date}
                  eventLocation={event?.event_desc}
                  eventOrganizer={event?.user?.name}
                  faculty={event?.faculty}
                  onPress={() =>
                    navigation.navigate("EventDetails", {
                      eventId: event?.id,
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
};

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
