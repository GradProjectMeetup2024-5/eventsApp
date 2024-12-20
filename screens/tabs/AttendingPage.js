import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from 'react-redux';
import { myJoinedEvents, showMyCreatedEvents } from '../../API/action/eventUser'

import EventCard from "../../components/ui/EventCard";
import * as actionType from '../../API/actionTypes';

import Colors from "../../src/constants/Colors";


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

  const handleSectionSelect = (section) => {
    setSelected(section);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
      </View>
      <>
        {events?.length > 0 ? (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {events.map((event, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <EventCard
                  eventName={event.event_name}
                  eventDescription={event.event_desc}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.emptyState}>
              <PlaceHolderIcon />
              <Text style={styles.emptyStateTitle}>No Trips Scheduled</Text>
              <Text style={styles.emptyStateDescription}>
                You have no upcoming Events. Add a trip or browse events.
              </Text>
            </View>
          </ScrollView>
        )}
      </>
      <View style={styles.footer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Home')} // Navigate to Home screen
        >
          <Text style={styles.buttonText}>Browse</Text>
        </Pressable>
      </View>
    </View>
  </SafeAreaView>
);

}
export default AttendingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingBottom: 80,
    backgroundColor: Colors.background.base,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    height: 60,
  },
  headerTitle: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: "#FFFFFF",
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
