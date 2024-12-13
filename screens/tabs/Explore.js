import { Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { showEvents } from "../../API/action/API";
import * as actionType from "../../API/actionTypes";
import Colors from "../../src/constants/Colors";
import Header from "../../components/Header";

export default function Explore() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const allEvents = useSelector((state) => state.event);

  const [user, setUser] = useState(SecureStore.getItemAsync("profile"));

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(showEvents({ type: actionType.FETCH_ALL }));
      setLoading(false);
    }, 2);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionSelect = (section) => {
    setSelected(section);
  };

  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("Profile");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Header onPress={pressHandler} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {allEvents?.map((event, index) => (
          <View key={event.id}>
            <EventCard
              eventName={event.event_name}
              eventDate={event.created_time}
              eventTime={event.eventTime}
              eventLocation={event.event_desc}
              eventOrganizer={event.userId}
              eventImage={back}
              profileImageSource={back}
              textColor="#FFFFFF"
            />
            {index < mockEvents.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
});
