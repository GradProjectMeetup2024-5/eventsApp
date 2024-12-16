import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Shadow } from "react-native-shadow-2";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../src/constants/Colors";
import EventDetailsHeader from "../components/EventDetailsHeader";

import { useRoute } from "@react-navigation/native";
import TextDetails from "../components/TextDetails";

import { useDispatch, useSelector } from "react-redux";

import { joinEvent, checkIfUserJoinedEvent, leaveEvent } from "../API/action/eventUser";

import * as actionType from "../API/actionTypes";

function EventDetails() {
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
    joinedUsers
  } = route.params;

  const dispatch = useDispatch();


  const [joinState, setJoinState] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const [loading, setLoading] = useState(true);


  const [isExpanded, setIsExpanded] = useState(false);

  const checkIfUserJoined  = useSelector((state) => state.eventUser.checkIfUserJoinedEvent);

  console.log("checkIfUserJoined",checkIfUserJoined)


  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      await dispatch(checkIfUserJoinedEvent(eventId));
      setLoading(false);
    };
  
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

  const num = 6;
  return (
    <SafeAreaView style={styles.container}>
      <EventDetailsHeader />
      <ScrollView
        contentContainerStyle={[{ paddingBottom: 20, alignItems: "center" }]}
        overScrollMode="never"
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
            {/*  */}
            <Image
              style={styles.posterImage}
              source={{
                uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799",
              }}
            />
            {/* <Text style={styles.posterName}>{creatorName}</Text> */}
            <Text style={styles.posterName}>zalameh rajol</Text>

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
          <Pressable
            style={joinState ? styles.joinedButton : styles.joinButton}
            onPress={joinHandler}
          >
            <Text style={joinState ? styles.joinedText : styles.joinText}>
              {joinState ? "Joined" : "Join"}
            </Text>
          </Pressable>
          {/* replace the join button with a component, use join button component here and at club details as well */}
        </View>
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
              {/* DATE AND TIME */}
              <Pressable style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="calendar-clear-outline"
                    size={32}
                    color={Colors.accent.primary}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.primary}>{eventDate}</Text>
                  <Text style={styles.secondary}>1:00 PM - 3:00 PM</Text>
                </View>
                <View style={styles.endItemContainer}>
                  <Ionicons
                    name="chevron-forward"
                    size={30}
                    color={Colors.gray.light}
                  />
                </View>
              </Pressable>

              {/* SEPARATOR */}
              <View
                style={{
                  borderBottomColor: Colors.gray.darkest,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginHorizontal: 20,
                }}
              />

              {/* LOCATION */}
              <Pressable style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="location-outline"
                    size={32}
                    color={Colors.accent.primary}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.primary}>{faculty}</Text>
                  <Text style={styles.secondary}>
                    {room},{floor}
                  </Text>
                </View>
                <View style={styles.endItemContainer}>
                  <Ionicons
                    name="chevron-forward"
                    size={30}
                    color={Colors.gray.light}
                  />
                </View>
              </Pressable>

              {/* SEPARATOR */}
              <View
                style={{
                  borderBottomColor: Colors.gray.darkest,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginHorizontal: 20,
                }}
              />

              {/* ATTENDEES */}
              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={32}
                    color={Colors.accent.primary}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.primary}>Attendees</Text>
                  <Text style={styles.secondary}>{ joinedUsers?.length == 0 ? "No Attendees" : joinedUsers?.length  }</Text>
                </View>
                <View style={styles.endItemContainer}>
                  <View style={styles.attendingImages}>
                    <View
                      style={[
                        styles.circle,
                        styles.circle4,
                        { left: 0, top: 0, zIndex: 4 },
                      ]}
                    />
                    <View
                      style={[
                        styles.circle,
                        styles.circle3,
                        { left: -17, top: 0, zIndex: 3 },
                      ]}
                    />
                    <View
                      style={[
                        styles.circle,
                        styles.circle2,
                        { left: -34, top: 0, zIndex: 2 },
                      ]}
                    />
                    <View
                      style={[
                        styles.circle,
                        styles.circle1,
                        { left: -51, top: 0, zIndex: 1 },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Shadow>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <TextDetails
            description="asjdasjdasjdasdjhasgda"
            textStyle={styles.sectionText}
            maxLines={2}
          />
        </View>
        <View style={styles.commentsContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: Colors.background.base,
    // borderWidth: 1,
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
    marginVertical: 12,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 500,
    color: Colors.accent.primary,
  },
  posterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
    marginHorizontal: 20,
  },
  detailsContainer: {
    marginVertical: 24,
  },
  detailsCard: {
    backgroundColor: Colors.background.surface,
    width: 384,

    borderRadius: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  iconContainer: {
    backgroundColor: Colors.background.base,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "column",
  },
  primary: {
    marginHorizontal: 10,
    color: Colors.gray.light,
    fontSize: 16,
    fontWeight: 500,
  },
  secondary: {
    marginHorizontal: 10,
    color: Colors.gray.light,
    fontSize: 13,
    fontWeight: 400,
  },
  aboutContainer: {
    marginHorizontal: 15,
    // marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 23,
    color: Colors.accent.primary,
    marginBottom: 4,
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
  commentsContainer: {},
  image: {
    resizeMode: "cover",
    height: 281,
    width: 381,
  },
  joinButton: {
    backgroundColor: Colors.accent.secondary,
    height: 28,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 20,
  },
  joinedButton: {
    backgroundColor: Colors.background.base,
    height: 28,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.accent.secondary,
    marginLeft: 20,
  },
  joinText: {
    fontSize: 16,
    color: Colors.gray.white,
  },
  joinedText: {
    fontSize: 16,
    color: Colors.accent.secondary,
  },
  posterImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  posterName: {
    fontSize: 20,
    marginHorizontal: 8,
    marginRight: 6,
    color: Colors.gray.light,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 90,
  },
  endItemContainer: {
    flex: 1,
    alignItems: "flex-end",
    // borderWidth: 1,
  },
  attendingImages: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: 90,
    // borderWidth: 1,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  circle1: {
    backgroundColor: Colors.background.subtle,
  },
  circle2: {
    backgroundColor: Colors.gray.darkest,
  },
  circle3: {
    backgroundColor: Colors.gray.muted,
  },
  circle4: {
    backgroundColor: Colors.gray.light,
  },
});
