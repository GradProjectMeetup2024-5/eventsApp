import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Colors from "../src/constants/Colors";
import SubSectionHeader from "../components/Headers/SubSectionHeader";
import AltEventCard from "../components/Cards/AltEventCard";
import NoEvents from "../components/NoEvents";

import { groupEventsByMonth } from "../utils/groupEventsByMonth";
import moment from "moment";

const dummyEvents = [
  {
    id: 1,
    event_name: "Event 1",
    faculty: "Faculty 1",
    floor: "Floor 1",
    room: "Room 1",
    image: "https://via.placeholder.com/150",
    event_date: "2023-01-15",
  },
  {
    id: 2,
    event_name: "Event 2",
    faculty: "Faculty 2",
    floor: "Floor 2",
    room: "Room 2",
    image: "https://via.placeholder.com/150",
    event_date: "2023-01-20",
  },
  {
    id: 3,
    event_name: "Event 3",
    faculty: "Faculty 3",
    floor: "Floor 3",
    room: "Room 3",
    image: "https://via.placeholder.com/150",
    event_date: "2023-02-10",
  },
  {
    id: 4,
    event_name: "Event 4",
    faculty: "Faculty 1",
    floor: "Floor 1",
    room: "Room 1",
    image: "https://via.placeholder.com/150",
    event_date: "2024-11-15",
  },
  {
    id: 5,
    event_name: "Event 5",
    faculty: "Faculty 2",
    floor: "Floor 2",
    room: "Room 2",
    image: "https://via.placeholder.com/150",
    event_date: "2024-12-20",
  },
  {
    id: 6,
    event_name: "Event 6",
    faculty: "Faculty 3",
    floor: "Floor 3",
    room: "Room 3",
    image: "https://via.placeholder.com/150",
    event_date: "2025-01-10",
  },
  {
    id: 7,
    event_name: "Event 7",
    faculty: "Faculty 4",
    floor: "Floor 4",
    room: "Room 4",
    image: "https://via.placeholder.com/150",
    event_date: "2025-01-12",
  },
  {
    id: 8,
    event_name: "Event 8",
    faculty: "Faculty 5",
    floor: "Floor 5",
    room: "Room 5",
    image: "https://via.placeholder.com/150",
    event_date: "2025-02-01",
  },
];

function AllEventsPage() {
  const one = "Upcoming";
  const two = "History";
  const [selector, setSelector] = useState(one);
  const [upcomingEvents, setUpcomingEvents] = useState({});
  const [historyEvents, setHistoryEvents] = useState({});
  const [loading, setLoading] = useState(true);

  const groupedEvents = selector === one ? upcomingEvents : historyEvents;
  const noEventsMessage =
    selector === one
      ? "The calendar's clear for now,\nbut who knows what's brewing behind the scenes?"
      : "No past events here, \nthis club's story is just getting started!";

  const noEventsIcon = selector === one ? "flask" : "sparkles";

  useEffect(() => {
    setLoading(true);
    const now = moment();

    const upcomingFilteredEvents = dummyEvents.filter((event) =>
      moment(event.event_date).isAfter(now)
    );
    const historyFilteredEvents = dummyEvents
      .filter((event) => moment(event.event_date).isBefore(now))
      .sort((a, b) => moment(b.event_date) - moment(a.event_date));

    setUpcomingEvents(groupEventsByMonth(upcomingFilteredEvents));
    setHistoryEvents(groupEventsByMonth(historyFilteredEvents));
    setLoading(false);
  }, []);

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
        title="All Events"
        backButton={true}
      />
      {loading ? (
        <SafeAreaView style={styles.safeArea}>
          <ActivityIndicator size="large" color={Colors.accent.secondary} />
        </SafeAreaView>
      ) : Object.keys(groupedEvents).length === 0 ? (
        <NoEvents icon={noEventsIcon} message={noEventsMessage} />
      ) : (
        // turn this into a flatlist
        <ScrollView
          contentContainerStyle={styles.container}
          overScrollMode="never"
        >
          {Object.keys(groupedEvents).map((month) => (
            <View key={month}>
              <View style={styles.dateContainer}>
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        selector === one
                          ? Colors.accent.secondary
                          : Colors.gray.light,
                    },
                  ]}
                >
                  {month}
                </Text>
              </View>
              {groupedEvents[month].map((event) => (
                <AltEventCard
                  key={event.id}
                  eventName={event.event_name}
                  faculty={event.faculty}
                  floor={event.floor}
                  room={event.room}
                  image={event.image}
                  eventDate={event.event_date}
                  eventId={event.id}
                  onPress={() => console.log(`Event ${event.id} pressed`)}
                  style={{ marginBottom: 12 }}
                  pageType={selector}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AllEventsPage;

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
  dateContainer: {
    marginBottom: 12,
    marginTop: 14,
    marginLeft: 15,
  },
  date: {
    fontSize: 21,
    fontWeight: "500",
  },
});
