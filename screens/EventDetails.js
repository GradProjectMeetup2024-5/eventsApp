import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { Shadow } from "react-native-shadow-2";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../src/constants/Colors";
import EventDetailsHeader from "../components/EventDetailsHeader";
import JoinClubButton from "../components/JoinClubButton";
import RefreshableScrollView from "../components/RefreshableScrollView";

import { useRoute } from "@react-navigation/native";
import TextDetails from "../components/TextDetails";

import { useDispatch, useSelector } from "react-redux";

import {
  joinEvent,
  checkIfUserJoinedEvent,
  leaveEvent,
} from "../API/action/eventUser";

import * as actionType from "../API/actionTypes";

function EventDetails() {
  const [InputCommentText, setInputCommentText] = useState("");

  function handleCommentTextInput(input) {
    setInputCommentText(input);
  }

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

  const [joinState, setJoinState] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  const checkIfUserJoined = useSelector(
    (state) => state.eventUser.checkIfUserJoinedEvent
  );

  console.log("checkIfUserJoined", checkIfUserJoined);

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     setLoading(true);
  //     await dispatch(checkIfUserJoinedEvent(eventId));
  //     setLoading(false);
  //   };

  //   fetchStatus();

  //   setJoinState(checkIfUserJoined);
  // }, [dispatch, eventId, checkIfUserJoined]);

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

  const num = 6;
  return (
    <SafeAreaView style={styles.container}>
      <EventDetailsHeader />
      <RefreshableScrollView
        style={[{ paddingBottom: 20, alignItems: "center" }]}
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
                  <Text style={styles.secondary}>
                    {joinedUsers?.length == 0
                      ? "No Attendees"
                      : joinedUsers?.length}
                  </Text>
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

        {/* ABOUT SECTION */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About</Text>
          <TextDetails
            description={about}
            textStyle={styles.sectionText}
            maxLines={5}
          />
        </View>
        <View style={styles.commentsContainer}>
          <View style={styles.commentsCard}>
            <View style={styles.commentsTitleContainer}>
              <View style={styles.commentsTitle}>
                <View style={styles.commentsIconContainer}>
                  <Ionicons
                    name="chatbubble"
                    size={24}
                    style={{
                      transform: [{ scaleX: -1 }],
                      // borderWidth: 1,
                      alignSelf: "center",
                    }}
                    color={Colors.gray.dark}
                  />
                </View>
                <Text style={styles.commentsTitleText}>Comments</Text>
              </View>
            </View>
            <View style={styles.commentInputContainer}>
              {/* <View style={styles.commentInputContent}> */}
              {/* <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  borderWidth: 1,
                }}
              > */}
              <View style={styles.placeholderPFP}>
                {/*Profile picture goes here*/}
              </View>
              {/* </View> */}

              <TextInput
                style={[
                  styles.commentInput,
                  {
                    padding: 0, // Remove internal padding
                    marginTop: 0, // Ensure no top margin
                    textAlignVertical: "center", // Vertically align text
                    lineHeight: 20, // Match the line height to surrounding text
                  },
                ]}
                placeholder="Add Comment"
                keyboardType="default"
                placeholderTextColor={Colors.gray.medium}
                value={InputCommentText}
                onChangeText={handleCommentTextInput}
                multiline={true}
                maxLength={180}
                // scrollEnabled={false}
              />
              <Pressable>
                <View style={styles.sendButton}>
                  <Text>Send</Text>
                </View>
              </Pressable>
              {/* </View> */}
            </View>
            <View></View>
          </View>
        </View>
      </RefreshableScrollView>
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
    // borderWidth: 1,
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
    // borderWidth: 1,
  },
  posterName: {
    fontSize: 20,
    marginHorizontal: 8,
    marginRight: 0,
    color: Colors.gray.light,
    width: 200,
    // borderWidth: 1,
  },
  joinButtonContaienr: {
    position: "absolute",
    left: 282,
    width: 90,
    // borderWidth: 1,
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
    width: 370,
    // borderWidth: 1,
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
  commentsContainer: {
    marginVertical: 24,
    // borderWidth: 1,
  },
  commentsCard: {
    alignItems: "center",
    width: 384,
    minHeight: 215,
    backgroundColor: Colors.background.surface,
    borderRadius: 26,
  },
  commentsTitleContainer: {
    marginVertical: 6,
    // borderWidth: 1,
  },
  commentsTitle: {
    flexDirection: "row",
    backgroundColor: Colors.background.elevated,
    width: 370,
    height: 38,
    borderRadius: 19,
    justifyContent: "flex-start",
    alignItems: "center",
    // borderWidth: 1,
  },
  commentsIconContainer: {
    marginLeft: 10,
  },
  commentsTitleText: {
    fontSize: 17,
    color: Colors.gray.light,
    marginHorizontal: 5,
  },
  commentInputContainer: {
    marginVertical: 3,
    backgroundColor: Colors.background.elevated,
    width: 355,
    borderRadius: 19,
    flexDirection: "row",
    paddingVertical: 5,
    // borderWidth: 1,
  },
  commentInput: {
    flex: 1,
    color: Colors.gray.light,
    marginLeft: 6,
    // alignItems: "flex-start",
    // borderWidth: 1,
  },
  sendButton: {
    backgroundColor: Colors.accent.secondary,
    width: 58,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 18,
    // borderWidth: 1,
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
  placeholderPFP: {
    marginLeft: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "gray",
    justifyContent: "flex-start",
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
