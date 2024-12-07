import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from 'react-redux';
import { createEvent } from '../../API/action/event'

export default function Create() {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState("");
  const [eventMonth, setEventMonth] = useState("");
  const [eventDay, setEventDay] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [amPm, setAmPm] = useState("AM");

  const [eventData, setEventData] = useState({ event_name: '', event_desc: '', event_image: '' })

  const handleSubmit = () => {
    if (!eventData.event_name || !eventMonth || !eventDay || !eventYear || !eventTime || !eventLocation || !eventData.event_desc || !eventData.event_image) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const eventDate = `${eventMonth}/${eventDay}/${eventYear}`;
    console.log("Event created:", {
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      eventImage,
    });
    dispatch(createEvent(eventData));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Create New Event</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              value={eventData.event_name}
              onChangeText={(text) => setEventData({ ...eventData, event_name: text })}
              placeholder="Enter event name"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.dateContainer}>
              <TextInput
                style={styles.dateInput}
                value={eventMonth}
                onChangeText={setEventMonth}
                placeholder="MM"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                style={styles.dateInput}
                value={eventDay}
                onChangeText={setEventDay}
                placeholder="DD"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                style={styles.dateInput}
                value={eventYear}
                onChangeText={setEventYear}
                placeholder="YYYY"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.timeContainer}>
              <TextInput
                style={styles.timeInput}
                value={eventTime}
                onChangeText={setEventTime}
                placeholder="HH:MM"
                placeholderTextColor="#808080"
              />
              <Pressable
                style={styles.amPmButton}
                onPress={() => setAmPm(amPm === "AM" ? "PM" : "AM")}
              >
                <Text style={styles.amPmButtonText}>{amPm}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={eventData.event_desc}
              onChangeText={(text) => setEventData({ ...eventData, event_desc: text })}
              placeholder="Enter event description"
              placeholderTextColor="#808080"
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={eventLocation}
              onChangeText={setEventLocation}
              placeholder="Enter event location"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={eventData.event_image}
              onChangeText={(text) => setEventData({ ...eventData, event_image: text })}
              placeholder="Enter image URL"
              placeholderTextColor="#808080"
            />
          </View>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#000000",
  },
  descriptionInput: {
    height: 100, // Increased height for the description field
    textAlignVertical: "top", // Aligns the placeholder text to the top
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#000000",
    flex: 1,
    marginHorizontal: 5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#000000",
  },
  amPmButton: {
    backgroundColor: "#DC143C",
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  amPmButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#DC143C",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 24,
    color: "#FFFFFF",
  },
});
