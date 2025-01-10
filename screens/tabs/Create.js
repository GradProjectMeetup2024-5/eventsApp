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
import { Picker } from '@react-native-picker/picker';


const Create = () => {
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
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationData, setLocationData] = useState({});

  const faculties = {
    "Conference Hall": "32.04235706530699, 35.90077170744573",
    // "\u0645\u0631\u0643\u0632 \u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0648\u0627\u0644\u062a\u062f\u0631\u064a\u0628 - \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629": "32.04106475017362, 35.9014549889317",
    "Faculty of Sharia & Islamic Studies": "32.04147166360305, 35.90049085546174",
    "Faculty of Engineering": "32.04110517252083, 35.90046230634091",
    "Student Activities Building": "32.041927962418825, 35.899582162383595",
    "Faculty of Economics and Administrative Sciences": "32.04044638372422, 35.90106738527859",
    "Faculty of IT": "32.040468804302854, 35.901375581054666",
    "Faculty of Pharmacy": "32.04022038450591, 35.90199291891347",
    "Presidency Building": "32.041619257774244, 35.902921284895164",
    "Faculty of Arts and Humanities": "32.03986960264171, 35.90239394345769",
    "King Hussein Sports Hall": "32.039664673423765, 35.90119666863786",
    "University Library": "32.0384689358981, 35.90094348597592",
    "Faculty of Nursing": "32.038288381582205, 35.90200846069219",
    "Faculty of Dentistry": "32.03955906760852, 35.902149117734986",
    "Faculty of Allied Medical Sciences": "32.03827496940359, 35.902139639993976",
    "ASU Stadium": "32.03847634377796, 35.8982060809678",
    "Animal House": "32.0375780674437, 35.90048945904207",
    "Square 360": "32.04117773331819, 35.90179475191668"
};

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

  const handleFacultyChange = (faculty) => {
    setEventFaculty(faculty);
    const coords = faculties[faculty].split(', ');
    setLatitude(parseFloat(coords[0]));
    setLongitude(parseFloat(coords[1]));
  };

  const handleSubmit = () => {
    if (!eventName || !eventFaculty || !eventFloor || !eventRoom || !eventDescription) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // const coordinates = locationData[eventFaculty] || "";
    // const [latitude, longitude] = coordinates.split(", ");

    const eventData = {
      event_name: eventName,
      event_desc: eventDescription,
      event_date: eventDate,
      event_time: eventTime,
      event_image: eventImage,
      faculty: eventFaculty,
      floor: eventFloor,
      room: eventRoom,
      latitude,
      longitude
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
      <Picker
        selectedValue={eventFaculty}
        onValueChange={handleFacultyChange}
        style={styles.picker}
      >
        <Picker.Item label="Select a faculty" value="" />
        {Object.keys(faculties).map((faculty) => (
          <Picker.Item key={faculty} label={faculty} value={faculty} />
        ))}
      </Picker>
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
};

export default Create;

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