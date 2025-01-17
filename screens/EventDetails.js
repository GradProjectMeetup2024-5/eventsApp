import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import CustomShadow from "../components/CustomShadow";

import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import Colors from "../src/constants/Colors";
import EventDetailsHeader from "../components/Headers/EventDetailsHeader";

import RefreshableScrollView from "../components/RefreshableScrollView";
import TextDetails from "../components/TextDetails";
import DetailCardSeparator from "../components/Event Details/DetailCardSeparator";
import DetailCardSection from "../components/Event Details/DetailCardSection";
import AttendeePictures from "../components/AttendeePictures";

import {
  joinEvent,
  checkIfUserJoinedEvent,
  leaveEvent,
} from "../API/action/eventUser";

import { findOneEvent } from "../API/action/event";

import * as actionType from "../API/actionTypes";
import CommentSection from "../components/Event Details/Comments/CommentSection";
import EventDetailsFooter from "../components/Event Details/EventDetailsFooter";
import ImageSlider from "../components/Event Details/ImageSlider";
import PosterDetails from "../components/PosterDetails";

function EventDetails() {
  const [joinState, setJoinState] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  const { eventId } = route.params;

  const oneEvent = useSelector((state) => state.event.oneEvent || {});

  useEffect(() => {
    dispatch(findOneEvent(eventId));
  }, [dispatch, eventId]);

  const dispatch = useDispatch();

  const checkIfUserJoined = useSelector(
    (state) => state.eventUser.checkIfUserJoinedEvent
  );

  const fetchStatus = async () => {
    setLoading(true);
    await dispatch(checkIfUserJoinedEvent(oneEvent?.id));
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
    setJoinState(checkIfUserJoined);
  }, [dispatch, oneEvent?.id, checkIfUserJoined]);

  function joinHandler() {
    setJoinState(!joinState);
  }

  async function joinHandler() {
    if (!joinState) {
      await dispatch(joinEvent(oneEvent?.id));
      setJoinState(true);
    } else {
      await dispatch(leaveEvent(oneEvent?.id));
      setJoinState(false);
    }
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    const dayOfMonth = date.getDate();

    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthsOfYear[date.getMonth()];

    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  }

  const isClub = oneEvent?.clubId ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      <EventDetailsHeader />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.accent.secondary}
          style={{ marginTop: 15 }}
        />
      ) : (
        <>
          <RefreshableScrollView
            style={[{ paddingBottom: 60, alignItems: "center" }]}
            onRefresh={fetchStatus}
          >
            <View style={styles.imagesContainer}>
              <ImageSlider images={oneEvent?.posters} />
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{oneEvent?.event_name}</Text>
            </View>

            {isClub ? (
              <PosterDetails
                isApproved={isApproved}
                creatorImage="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799"
                creatorName={oneEvent?.club?.name}
                inEventDetails={true}
                club={true}
              />
            ) : (
              <PosterDetails
                isApproved={isApproved}
                creatorImage="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799"
                creatorName={oneEvent?.user?.name}
                inEventDetails={true}
                club={false}
              />
            )}

            {/* DETAILS SECTION */}
            <View style={styles.detailsContainer}>
              <CustomShadow>
                <View style={styles.detailsCard}>
                  {/* DATE AND TIME SUB-SECTION*/}
                  <DetailCardSection
                    iconName="calendar-clear-outline"
                    primary={formatDate(oneEvent?.event_date)}
                    secondary={formatTime(oneEvent?.eventDate)}
                  >
                    {/* <Ionicons
                      name="chevron-forward"
                      size={30}
                      color={Colors.gray.light}
                    /> */}
                  </DetailCardSection>

                  {/* SEPARATOR */}
                  <DetailCardSeparator />

                  {/* LOCATION SUB-SECTION*/}
                  <DetailCardSection
                    iconName="location-outline"
                    primary={oneEvent?.faculty}
                    secondary={oneEvent?.room + ", " + oneEvent?.floor}
                  >
                    {/* <Ionicons
                      name="chevron-forward"
                      size={30}
                      color={Colors.gray.light}
                    /> */}
                  </DetailCardSection>

                  {/* SEPARATOR */}
                  <DetailCardSeparator />

                  {/* ATTENDEES SUB-SECTION*/}
                  <DetailCardSection
                    iconName="checkmark-circle-outline"
                    primary="Attendees"
                    secondary={
                      oneEvent?.joined_users?.length == 0
                        ? "No Attendees"
                        : oneEvent?.joined_users?.length
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
              </CustomShadow>
            </View>

            {/* ABOUT SECTION */}
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutTitle}>About</Text>
              <TextDetails
                description={oneEvent?.event_desc}
                textStyle={styles.sectionText}
                maxLines={5}
              />
            </View>

            {/* COMMENTS SECTION */}

            <CommentSection eventId={oneEvent?.id} />
          </RefreshableScrollView>
          <EventDetailsFooter
            isAttending={joinState}
            onJoinLeave={joinHandler}
          />
        </>
      )}
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
    marginTop: 12,
  },
  titleContainer: {
    marginBottom: 14,
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
    fontWeight: 400,
  },
  readMoreButton: {
    color: Colors.accent.secondary,
    fontWeight: 600,
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
