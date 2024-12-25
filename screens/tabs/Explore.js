import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../src/constants/Colors";
import EventCard from "../../components/ui/EventCard";
import TabBar from "../../components/ui/HomeTabBar";
import BottomNavigation from "../../components/ui/BottomNavigation";
import RefreshableScrollView from "../../components/RefreshableScrollView";

import { useDispatch, useSelector } from "react-redux";
import { showEvents } from "../../API/action/event";

import * as actionType from "../../API/actionTypes";

const Header = ({ onPress }) => {
  return (
    <View style={[styles.headerContainer, { paddingBottom: 10 }]}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchbar}
          placeholder="Search"
          placeholderTextColor="#FFFFFF"
        />
        <Pressable style={styles.iconContainer} onPress={onPress}>
          <Ionicons
            name="person-outline"
            size={28}
            color={Colors.accent.primary}
          />
        </Pressable>
      </View>
      <TabBar />
      <BottomNavigation />
    </View>
  );
};

import { back } from "../../assets/eventplaceholder.png";
import * as SecureStore from "expo-secure-store";

export default function Explore() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const allEvents = useSelector((state) => state.event);

  const [user, setUser] = useState(SecureStore.getItemAsync("profile"));

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(showEvents({ type: actionType.FETCH_ALL }));
  //     setLoading(false);
  //   }, 2);

  //   return () => clearTimeout(timer);
  // }, []);

  const fetchEvents = () => {
    dispatch(showEvents({ type: actionType.FETCH_ALL }));
  };

  useEffect(() => {
    fetchEvents();
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
      <Header onPress={pressHandler} />
      <RefreshableScrollView
        onRefresh={fetchEvents}
        style={styles.scrollViewContent}
      >
        {allEvents?.map((event, index) => (
          <View key={event.id}>
            <EventCard
              eventName={event?.event_name}
              eventDate={event?.event_date}
              eventLocation={event?.event_desc}
              eventOrganizer={event?.userId}
              eventImage={back}
              profileImageSource={back}
              textColor="#FFFFFF"
              onPress={() =>
                navigation.navigate("EventDetails", {
                  // clubName: club?.name,
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
            />
            {index < allEvents.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </RefreshableScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000000",
    backgroundColor: Colors.background.base,
  },
  headerContainer: {
    backgroundColor: Colors.background.elevated,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: Colors.background.base,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  searchbar: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.background.surface,
    paddingLeft: 15,
    // color: "#FFFFFF",
  },
  iconContainer: {
    padding: 5,
    paddingLeft: 15,
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray.darkest,
    marginVertical: 10,
  },
});
