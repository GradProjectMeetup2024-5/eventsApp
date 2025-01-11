import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../src/constants/Colors";
import EventCard from "../../components/Cards/EventCard";
import RefreshableScrollView from "../../components/RefreshableScrollView";
import { useDispatch, useSelector } from "react-redux";
import { showEvents } from "../../API/action/event";
import * as actionType from "../../API/actionTypes";
import Header from "../../components/Headers/Header";

import { back } from "../../assets/eventplaceholder.png";

export default function Explore() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const allEvents = useSelector((state) => state.event);

  const fetchEvents = () => {
    dispatch(showEvents({ type: actionType.FETCH_ALL }));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = allEvents?.filter((event) =>
    event.event_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header searchText={searchText} onSearchChange={setSearchText} />
      <RefreshableScrollView
        onRefresh={fetchEvents}
        style={styles.bodyContainer}
      >
        {filteredEvents?.map((event, index) => (
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
            {index < filteredEvents.length - 1 && (
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </RefreshableScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bodyContainer: {
    // flex: 1,
    marginTop: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  searchbar: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.background.surface,
    paddingLeft: 15,
    color: "#FFFFFF",
  },
  iconContainer: {
    padding: 5,
    paddingLeft: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray.darkest,
    marginVertical: 12,
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
