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
import Colors from "../../src/constants/Colors";
import { useDispatch } from 'react-redux';
import { createEvent } from '../../API/action/event';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Create() {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [eventFaculty, setEventFaculty] = useState("");
  const [eventFloor, setEventFloor] = useState("");
  const [eventRoom, setEventRoom] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(false);
    setEventTime(currentTime);
  };

  const handleSubmit = () => {
    if (!eventName || !eventFaculty || !eventFloor || !eventRoom || !eventDescription) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Format the event date and time for submission
    const eventData = {
      event_name: eventName,
      event_desc: eventDescription,
      event_date: eventDate,
      event_time: eventTime,
      event_image: eventImage,
      faculty: eventFaculty,
      floor: eventFloor,
      room: eventRoom
    };

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
              value={eventName}
              onChangeText={setEventName}
              placeholder="Enter event name"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <Pressable style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateButtonText}>{eventDate.toLocaleDateString()}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={eventDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time</Text>
            <Pressable style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timeButtonText}>{eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
            </Pressable>
            {showTimePicker && (
              <DateTimePicker
                value={eventTime}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
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
              value={eventImage}
              onChangeText={setEventImage}
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
    backgroundColor: Colors.background.base,
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
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#000000",
  },
  timeButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  timeButtonText: {
    fontSize: 16,
    color: "#000000",
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
