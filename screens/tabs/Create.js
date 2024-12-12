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
  const [eventFaculty,setEventFaculty] = useState("");
  const [eventFloor,setEventFloor] = useState("");
  const [eventRoom,setEventRoom] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [amPm, setAmPm] = useState("AM");

  const [eventData, setEventData] = useState({ event_name: '', event_desc: '', event_image: '',
    faculty: '',floor: '', room: '', image:''})

    const handleSubmit = () => {
      if (!eventName || !eventMonth || !eventDay || !eventYear || !eventTime ) {
        Alert.alert("Error", "All fields are required.");
        return;
      }
      let [hours, minutes] = eventTime.split(":").map(Number);

      if (amPm === "PM" && hours < 12) hours += 12; 
      if (amPm === "AM" && hours === 12) hours = 0; 
     
      const eventDate = new Date(
        `${eventYear}-${eventMonth.padStart(2, '0')}-${eventDay.padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      );
      const newEventData = {
        event_name: eventName,
        event_desc: eventDescription,
        event_date: eventDate,
        event_time: eventTime,
        event_image: eventImage,
        faculty:eventFaculty,
        floor:eventFloor,
        room:eventRoom
      };
    
      console.log("Event created:", newEventData);
      
      dispatch(createEvent(newEventData));
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
              value={eventName}
               onChangeText={setEventName}
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
            <Text style={styles.label}>Faculty</Text>
            <TextInput
              style={styles.input}
              value={eventFaculty}
              onChangeText={setEventFaculty}
              placeholder="Enter event faculty"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Floor</Text>
            <TextInput
              style={styles.input}
              value={eventFloor}
              onChangeText={setEventFloor}
              placeholder="Enter event Floor"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Room</Text>
            <TextInput
              style={styles.input}
              value={eventRoom}
              onChangeText={setEventRoom}
              placeholder="Enter event Room"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="Enter event description"
              placeholderTextColor="#808080"
              multiline
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
