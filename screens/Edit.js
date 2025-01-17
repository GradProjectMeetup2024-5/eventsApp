import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../API/action/event";
import SubSectionHeader from "../components/Headers/SubSectionHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import AuthTextInput from "../components/ui/AuthUi/AuthTextInput";
import AuthButton from "../components/ui/AuthUi/AuthButton";
import Colors from "../src/constants/Colors";

const { width } = Dimensions.get("window");

const Create = ({ eventID = 3 }) => {
  console.log("eventId", eventID);

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
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to the media library."
        );
      }
    };
    requestPermissions();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const totalImages = images.length + result.assets.length;
      if (totalImages > 6) {
        Alert.alert(
          "Image Limit Reached",
          "You can only upload up to 6 images."
        );
      } else {
        setImages((prevImages) => [
          ...prevImages,
          ...result.assets.slice(0, 6 - prevImages.length),
        ]);
      }
    }
  };

  const faculties = {
    "Conference Hall": "32.04235706530699, 35.90077170744573",
    // "\u0645\u0631\u0643\u0632 \u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0648\u0627\u0644\u062a\u062f\u0631\u064a\u0628 - \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629": "32.04106475017362, 35.9014549889317",
    "Faculty of Sharia & Islamic Studies":
      "32.04147166360305, 35.90049085546174",
    "Faculty of Engineering": "32.04110517252083, 35.90046230634091",
    "Student Activities Building": "32.041927962418825, 35.899582162383595",
    "Faculty of Economics and Administrative Sciences":
      "32.04044638372422, 35.90106738527859",
    "Faculty of IT": "32.040468804302854, 35.901375581054666",
    "Faculty of Pharmacy": "32.04022038450591, 35.90199291891347",
    "Presidency Building": "32.041619257774244, 35.902921284895164",
    "Faculty of Arts and Humanities": "32.03986960264171, 35.90239394345769",
    "King Hussein Sports Hall": "32.039664673423765, 35.90119666863786",
    "University Library": "32.0384689358981, 35.90094348597592",
    "Faculty of Nursing": "32.038288381582205, 35.90200846069219",
    "Faculty of Dentistry": "32.03955906760852, 35.902149117734986",
    "Faculty of Allied Medical Sciences":
      "32.03827496940359, 35.902139639993976",
    "ASU Stadium": "32.03847634377796, 35.8982060809678",
    "Animal House": "32.0375780674437, 35.90048945904207",
    "Square 360": "32.04117773331819, 35.90179475191668",
  };

  const uploadImages = async () => {
    try {
      setUploading(true);
      const uploadedUrls = await Promise.all(
        images.map(async (image) => {
          const response = await fetch(image.uri);
          const blob = await response.blob();
          const fileName = `${new Date().getTime()}-${image.uri
            .split("/")
            .pop()}`;
          const imageRef = ref(storage, `${fileName}`);
          await uploadBytes(imageRef, blob);
          return await getDownloadURL(imageRef);
        })
      );
      setUploading(false);
      return uploadedUrls;
    } catch (error) {
      setUploading(false);
      Alert.alert(
        "Upload Error",
        error.message || "An unknown error occurred."
      );
      return [];
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setEventDate(selectedDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setEventTime(selectedTime);
  };

  const handleFacultyChange = (faculty) => {
    setEventFaculty(faculty);
    const coords = faculties[faculty].split(", ");
    setLatitude(parseFloat(coords[0]));
    setLongitude(parseFloat(coords[1]));
  };

  const handleSubmit = async () => {
    // if (!eventName || !eventFaculty || !eventFloor || !eventRoom || !eventDescription) {
    //   Alert.alert("Error", "All fields are required.");
    //   return;
    // }

    // if (images.length === 0) {
    //   Alert.alert("Error", "Please select at least one image.");
    //   return;
    // }

    const uploadedUrls = await uploadImages();
    console.log("uploadedUrls", uploadedUrls);

    const eventData = {
      event_name: eventName,
      event_desc: eventDescription,
      event_date: eventDate,
      event_time: eventTime,
      faculty: eventFaculty,
      floor: eventFloor,
      room: eventRoom,
      posters: uploadedUrls,
    };

    dispatch(updateEvent(eventID, eventData));
    setEventName("");
    setEventDescription("");
    setEventFaculty("");
    setEventFloor("");
    setEventRoom("");
    setImages([]);
    Alert.alert("Success", "Event created successfully.");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubSectionHeader title="Edit" subPageButtons={false} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        overScrollMode="never"
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Name</Text>

            <AuthTextInput
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>

          <Text style={[styles.label, { alignSelf: "flex-start" }]}>
            Date & Time
          </Text>

          <View style={styles.inputContainerRow}>
            <View style={styles.inputContainer}>
              <Pressable
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.text}>
                  {eventDate.toLocaleDateString()}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={eventDate}
                  mode="date"
                  display="calendar"
                  onChange={handleDateChange}
                />
              )}
            </View>

            <View style={styles.inputContainer}>
              <Pressable
                style={styles.timeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.text}>
                  {eventTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
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
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label}>Faculty</Text>
          </View>
          <View
            style={[
              styles.inputContainer,
              { borderRadius: 50, overflow: "hidden" },
            ]}
          >
            <Picker
              selectedValue={eventFaculty}
              onValueChange={handleFacultyChange}
              style={styles.picker}
              dropdownIconColor={Colors.accent.secondary}
            >
              <Picker.Item
                label="Select a faculty"
                value=""
                color={eventFaculty === "" ? Colors.gray.dark : "#000"}
              />
              {Object.keys(faculties).map((faculty) => (
                <Picker.Item
                  key={faculty}
                  label={faculty}
                  value={faculty}
                  color={faculty === eventFaculty ? Colors.gray.light : "black"}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Floor & Room</Text>

          <View style={styles.inputContainerRow}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={eventFloor}
                onChangeText={setEventFloor}
                placeholder="Enter Floor"
                placeholderTextColor={Colors.gray.dark}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={eventRoom}
                onChangeText={setEventRoom}
                placeholder="Enter Room"
                placeholderTextColor={Colors.gray.dark}
              />
            </View>
          </View>

          <Text style={styles.label}>Image</Text>

          <View style={styles.uploadImagesContainer}>
            <View style={[styles.uploadButtonRow]}>
              <Pressable onPress={pickImages} style={styles.button}>
                <Text style={styles.buttonText}>Upload Image</Text>
              </Pressable>

              <Text style={[styles.text, { marginLeft: 10 }]}>
                {images.length} {images.length === 1 ? "Image" : "Images"}{" "}
                selected
              </Text>
            </View>

            {images.length > 0 && (
              <ScrollView
                horizontal
                overScrollMode="never"
                contentContainerStyle={{
                  // flexDirection: "row",
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                {images.map((image, index) => (
                  <Pressable onPress={() => handleImagePress(index)}>
                    <View key={index}>
                      <Image
                        source={{ uri: image.uri }}
                        style={{ width: 100, height: 100, margin: 5 }}
                      />
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
                { borderRadius: 18 },
              ]}
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="Event description"
              placeholderTextColor={Colors.gray.dark}
              multiline
            />
          </View>

          <AuthButton onPress={handleSubmit}>Save</AuthButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: Colors.background.base,
    paddingTop: 15,
    paddingBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 32,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 15,
    fontWeight: "600",
    color: Colors.gray.light,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: Colors.background.surface,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 24,
    fontSize: 16,
    color: Colors.gray.light,
    minHeight: 47,
    width: 147,
    alignSelf: "center",
  },
  descriptionInput: {
    minHeight: 95,
    lineHeight: 20,
    textAlignVertical: "top",
    width: width - 32,
  },
  dateButton: {
    backgroundColor: Colors.background.surface,
    width: 147,
    borderRadius: 24,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
  },
  timeButton: {
    backgroundColor: Colors.background.surface,
    width: 147,
    borderRadius: 24,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.gray.light,
  },
  uploadImagesContainer: {
    marginBottom: 15,
    width: width - 32,
  },
  uploadButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
  },
  button: {
    backgroundColor: Colors.background.surface,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    width: 150,
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 24,
    color: Colors.accent.secondary,
  },
  picker: {
    height: 55,
    width: width - 32,
    backgroundColor: Colors.background.surface,
    justifyContent: "center",
    alignItems: "center",
  },
});
