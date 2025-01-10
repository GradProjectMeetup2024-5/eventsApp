import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ClubDetailsHeader from "../components/Headers/ClubDetailsHeader";
import AltEventCard from "../components/Cards/AltEventCard";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../src/constants/Colors";

import { useContext, useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import { findOneClub } from "../API/action/club";
import { showClubEvents } from "../API/action/clubEvent";

import * as actionType from "../API/actionTypes";

import { useRoute } from "@react-navigation/native";
import TextDetails from "../components/TextDetails";
import JoinClubButton from "../components/JoinClubButton";

function ClubDetails() {
  const route = useRoute();
  const { clubId } = route.params;
  const clubIdNumber = Number(clubId);
  const [loading, setLoading] = useState(true);

  const club = useSelector((state) => state.clubReducer.club);
  const clubEvent = useSelector((state) => state.clubEventsReducer.clubEvent);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          dispatch(findOneClub(clubIdNumber)),
          dispatch(showClubEvents(clubIdNumber)),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, clubIdNumber]);

  const navigation = useNavigation();
  const pressHandler = (route) => {
    navigation.navigate(route);
  };

  console.log("club name from club", club?.name);
  return (
    <SafeAreaView style={styles.container}>
      {/* CLUB HEADER */}
      <ClubDetailsHeader title={club?.name} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.accent.secondary}
          style={{ marginTop: 15 }}
        />
      ) : (
        <>
          {/* CLUB HEAD SECTION */}
          <View style={styles.clubHead}>
            <Image
              style={styles.clubImg}
              source={{
                uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799",
              }}
            />
            <View style={styles.clubInfo}>
              <View style={styles.countContainer}>
                <View style={styles.count}>
                  <Text style={styles.countNum}>{club?.membersCount}</Text>
                  <Text style={styles.countLabel}>members</Text>
                </View>
                <View style={styles.count}>
                  <Text style={styles.countNum}>{club?.eventsCount}</Text>
                  <Text style={styles.countLabel}>events</Text>
                </View>
              </View>
              <JoinClubButton />
            </View>
          </View>

          {/* CLUB BODY SECTION */}
          <ScrollView style={styles.clubBody} overScrollMode="never">
            {/* EVENT CARDS SECTION */}
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Events</Text>
              <Pressable onPress={() => pressHandler("AllEvents")}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: Colors.accent.secondary },
                  ]}
                >
                  See All
                </Text>
              </Pressable>
            </View>
            <View style={styles.eventScrollView}>
              {clubEvent?.length > 0 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  overScrollMode="never"
                >
                  {clubEvent?.map((event) => (
                    <AltEventCard
                      key={event?.id}
                      eventDate={event?.event_date}
                      eventName={event?.event_name}
                      faculty={event?.faculty}
                      floor={event?.floor}
                      room={event?.room}
                      image={event?.image}
                      onPress={() =>
                        navigation.navigate("EventDetails", {
                          clubName: club?.name,
                          eventName: event?.event_name,
                          eventDate: event?.event_date,
                          floor: event?.floor,
                          room: event?.room,
                          about: event?.event_desc,
                          image: event?.image,
                          faculty: event?.faculty,
                        })
                      }
                    />
                  ))}
                </ScrollView>
              ) : (
                <AltEventCard noEvents={true} />
              )}
            </View>
            {/* ABOUT US SECTION */}
            <View
              style={[styles.sectionRow, { marginTop: 20, marginBottom: 8 }]}
            >
              <Text
                style={[styles.sectionTitle, { color: Colors.accent.primary }]}
              >
                About Us
              </Text>
            </View>
            <View style={styles.aboutSection}>
              <TextDetails
                textStyle={styles.aboutText}
                description={club?.desc}
                maxLines={6}
              />
            </View>
            {/* CONTACT US SECTION */}
            <View style={styles.sectionRow}>
              <Text
                style={[styles.sectionTitle, { color: Colors.accent.primary }]}
              >
                Contact Us
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={[styles.buttonContainer, { marginLeft: 0 }]}>
                <Pressable
                  onPress={() => Linking.openURL(`${club?.instagram}`)}
                >
                  <Ionicons
                    name="logo-instagram"
                    color={Colors.accent.secondary}
                    size={38}
                  />
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable onPress={() => Linking.openURL(`${club?.facebook}`)}>
                  <Ionicons
                    name="logo-facebook"
                    color={Colors.accent.secondary}
                    size={38}
                  />
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable onPress={() => Linking.openURL(`${club?.whatsapp}`)}>
                  <Ionicons
                    name="logo-whatsapp"
                    color={Colors.accent.secondary}
                    size={38}
                  />
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable onPress={() => Linking.openURL(`${club?.linkedIn}`)}>
                  <Ionicons
                    name="logo-linkedin"
                    color={Colors.accent.secondary}
                    size={38}
                  />
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default ClubDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  clubHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
    alignItems: "center",
    padding: 20,
  },
  clubImg: {
    height: 122,
    width: 122,
    borderRadius: 61,
    marginRight: 26,
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    paddingBottom: 15,
  },
  count: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  countNum: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.gray.light,

    marginBottom: -3,
  },
  countLabel: {
    fontSize: 14,
    color: Colors.gray.light,
    fontWeight: "400",
  },
  clubInfo: {
    width: 180,
  },
  clubBody: {
    flex: 1,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 22,
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.gray.light,
  },
  eventScrollView: {
    alignItems: "center",
    flexDirection: "row",
  },
  aboutSection: {
    marginHorizontal: 22,
  },
  aboutText: {
    color: Colors.gray.light,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginHorizontal: 22,
    marginBottom: 25,
  },
  buttonContainer: {
    backgroundColor: Colors.background.surface,
    height: 50,
    width: 50,
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
