import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import Colors from "../src/constants/Colors";
import EventDetailsHeader from "../components/Headers/EventDetailsHeader";
import JoinClubButton from "../components/JoinClubButton";
import RefreshableScrollView from "../components/RefreshableScrollView";
import TextDetails from "../components/TextDetails";
import DetailCardSeparator from "../components/DetailCardSeparator";
import DetailCardSection from "../components/DetailCardSection";
import AttendeePictures from "../components/AttendeePictures";

import {
  joinEvent,
  checkIfUserJoinedEvent,
  leaveEvent,
} from "../API/action/eventUser";
import * as actionType from "../API/actionTypes";
import CommentSection from "../components/CommentSection";
import EventDetailsFooter from "../components/EventDetailsFooter";

function EventDetails() {
  const [joinState, setJoinState] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const route = useRoute();

  const {
    eventName,
    eventDate,
    floor,
    room,
    about,
    image,
    clubName,
    faculty,
    creatorName,
    eventId,
    joinedUsers,
  } = route.params;

  const dispatch = useDispatch();

  const checkIfUserJoined = useSelector(
    (state) => state.eventUser.checkIfUserJoinedEvent
  );

  const fetchStatus = async () => {
    setLoading(true);
    await dispatch(checkIfUserJoinedEvent(eventId));
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
    setJoinState(checkIfUserJoined);
  }, [dispatch, eventId, checkIfUserJoined]);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  function joinHandler() {
    setJoinState(!joinState);
  }

  async function joinHandler() {
    if (!joinState) {
      await dispatch(joinEvent(eventId));
      setJoinState(true);
    } else {
      await dispatch(leaveEvent(eventId));
      setJoinState(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <EventDetailsHeader />
      <RefreshableScrollView
        style={[{ paddingBottom: 60, alignItems: "center" }]}
        onRefresh={fetchStatus}
      >
        <View style={styles.imagesContainer}></View>
        <Shadow
          sides={{ bottom: true, top: false, start: false, end: true }}
          corners={{
            topStart: false,
            topEnd: false,
            bottomStart: false,
            bottomEnd: true,
          }}
          offset={[0, 0]}
          distance={6}
          startColor="rgba(0, 0, 0, 0.20)"
          endColor="rgba(0, 0, 0, 0.05)"
        >
          <View style={styles.imageSliderContainer}>
            <Image
              source={{
                uri: "https://assets.cntraveller.in/photos/66667d71fec9b2e737ab2480/master/w_1600%2Cc_limit/DAG%2520-%2520Caption%2520_Installation%2520shot%2520at%2520DAG%25201_%2520(1).jpg",
              }}
              style={styles.image}
            />
          </View>
        </Shadow>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{eventName}</Text>
        </View>
        <View style={styles.posterContainer}>
          <Pressable style={styles.navigationContainer}>
            <Image
              style={styles.posterImage}
              source={{
                uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799",
              }}
            />
            <Text style={styles.posterName}>{creatorName}</Text>

            {isApproved ? (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={Colors.accent.secondary}
              />
            ) : (
              <View style={{ width: 24, height: 24 }} />
            )}
          </Pressable>

          <View style={styles.joinButtonContaienr}>
            <JoinClubButton />
          </View>
        </View>

        {/* DETAILS SECTION */}
        <View style={styles.detailsContainer}>
          <Shadow
            sides={{ bottom: true, top: false, start: false, end: true }}
            corners={{
              topStart: false,
              topEnd: false,
              bottomStart: false,
              bottomEnd: true,
            }}
            offset={[0, 0]}
            distance={6}
            startColor="rgba(0, 0, 0, 0.20)"
            endColor="rgba(0, 0, 0, 0.05)"
          >
            <View style={styles.detailsCard}>
              {/* DATE AND TIME SUB-SECTION*/}
              <DetailCardSection
                iconName="calendar-clear-outline"
                primary={eventDate}
                secondary="1:00 PM - 3:00 PM"
              >
                <Ionicons
                  name="chevron-forward"
                  size={30}
                  color={Colors.gray.light}
                />
              </DetailCardSection>

              {/* SEPARATOR */}
              <DetailCardSeparator />

              {/* LOCATION SUB-SECTION*/}
              <DetailCardSection
                iconName="location-outline"
                primary={faculty}
                secondary={room + ", " + floor}
              >
                <Ionicons
                  name="chevron-forward"
                  size={30}
                  color={Colors.gray.light}
                />
              </DetailCardSection>

              {/* SEPARATOR */}
              <DetailCardSeparator />

              {/* ATTENDEES SUB-SECTION*/}
              <DetailCardSection
                iconName="checkmark-circle-outline"
                primary="Attendees"
                secondary={
                  joinedUsers?.length == 0
                    ? "No Attendees"
                    : joinedUsers?.length
                }
              >
                <AttendeePictures
                  attendees={[
                    "https://picsum.photos/100/300",
                    "https://picsum.photos/200/100",
                    "https://picsum.photos/100/100",
                    "https://picsum.photos/300/100",
                  ]}
                />
              </DetailCardSection>
            </View>
          </Shadow>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About</Text>
          <TextDetails
            description={about}
            textStyle={styles.sectionText}
            maxLines={5}
          />
        </View>

        {/* COMMENTS SECTION */}
        <CommentSection eventId={eventId} />
      </RefreshableScrollView>
      <EventDetailsFooter
      isAttending={joinState}
      onJoinLeave={joinHandler}
    />
    </SafeAreaView>
  );
}

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  imagesContainer: {
    marginHorizontal: 50,
    marginVertical: 8,
  },
  imageSliderContainer: {
    overflow: "hidden",
    borderRadius: 8,
  },
  titleContainer: {
    marginTop: 15,
    marginVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 500,
    color: Colors.accent.primary,
    textAlign: "center",
  },
  posterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    maxWidth: 400,
  },
  posterName: {
    fontSize: 20,
    marginHorizontal: 8,
    marginRight: 0,
    color: Colors.gray.light,
    width: 200,
  },
  joinButtonContaienr: {
    position: "absolute",
    left: 282,
    width: 90,
  },
  detailsContainer: {
    marginVertical: 24,
  },
  detailsCard: {
    backgroundColor: Colors.background.surface,
    width: 384,
    borderRadius: 16,
  },
  aboutContainer: {
    marginHorizontal: 15,
    width: 370,
  },
  aboutTitle: {
    fontSize: 23,
    color: Colors.accent.primary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: Colors.gray.light,
    fontWeight: 500,
  },
  readMoreButton: {
    color: Colors.accent.secondary,
    fontWeight: 600,
  },
  image: {
    resizeMode: "cover",
    height: 281,
    width: 381,
  },
  posterImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 90,
  },
  attendingImages: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: 90,
  },
});
