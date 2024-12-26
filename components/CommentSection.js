import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import Comment from "./Comment";

function CommentSection({ eventId }) {
  const [inputCommentText, setInputCommentText] = useState("");
  const [placeholderCommentState] = useState(false);
  const [tempComments, setTempComments] = useState([
    "Wait where is this again?",
    "Looking forward to it!",
    "Can't wait to see everyone there!",
    "Great event!",
    "What time does it start?",
    "Had an amazing time!",
  ]);
  const [visibleComments, setVisibleComments] = useState(3);

  const handleSend = () => {
    if (inputCommentText.trim()) {
      // Place submit logic here, Firas.
      if (inputCommentText.trim()) {
        setTempComments((prevComments) => [...prevComments, inputCommentText]);
        setInputCommentText("");
      }
      console.log("Comment submitted: ", inputCommentText);
      setInputCommentText("");
    }
  };

  const handleSeeMore = () => {
    setVisibleComments((prev) => prev + 3);
  };

  function handleCommentTextInput(input) {
    setInputCommentText(input);
  }
  return (
    <View
      // behavior="padding"
      // keyboardVerticalOffset={100}
      style={styles.commentsContainer}
    >
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
          <View style={styles.placeholderPFP}>
            {/*Profile picture goes here*/}
          </View>
          {/* </View> */}

          <TextInput
            style={[styles.commentInput, {}]}
            placeholder="Add Comment"
            keyboardType="default"
            placeholderTextColor={Colors.gray.medium}
            value={inputCommentText}
            onChangeText={handleCommentTextInput}
            multiline={true}
            maxLength={180}
            // returnKeyType="send"
            // returnKeyLabel="send"
            onSubmitEditing={handleSend}
            submitBehavior="submit"
          />
          <Pressable onPress={handleSend} disabled={!inputCommentText.trim()}>
            <View
              style={[
                styles.sendButton,
                inputCommentText.trim() && {
                  backgroundColor: Colors.accent.secondary,
                },
              ]}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </View>
          </Pressable>
          {/* </View> */}
        </View>
        <View style={styles.comments}>
          {tempComments
            .slice()
            .reverse()
            .slice(0, visibleComments)
            .map((comment, index) => (
              <Comment key={tempComments.length - 1 - index} text={comment} />
            ))}
        </View>
        {tempComments.length > visibleComments && (
          <Pressable onPress={handleSeeMore} style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See More</Text>
            <Ionicons
              name="arrow-down-outline"
              size={24}
              color={Colors.accent.secondary}
            />
          </Pressable>
        )}

        {tempComments.length === 0 && (
          <View style={styles.emptyComments}>
            <Text style={styles.noCommentsText}>
              No one has left a comment yet, why not be the first?
            </Text>
            <Ionicons
              name="happy-outline"
              size={30}
              color={Colors.background.subtle}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default CommentSection;

const styles = StyleSheet.create({
  commentsContainer: {
    marginVertical: 24,
  },
  commentsCard: {
    alignItems: "center",
    width: 384,
    minHeight: 215,
    backgroundColor: Colors.background.surface,
    borderRadius: 26,
    paddingBottom: 10,
  },
  commentsTitleContainer: {
    marginVertical: 6,
  },
  commentsTitle: {
    flexDirection: "row",
    backgroundColor: Colors.background.elevated,
    width: 370,
    height: 38,
    borderRadius: 19,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  commentsIconContainer: {
    marginLeft: 10,
  },
  commentsTitleText: {
    fontSize: 17,
    color: Colors.gray.light,
    marginHorizontal: 5,
  },
  comments: {
    marginVertical: 5,
  },
  emptyComments: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    marginVertical: 25,
  },
  noCommentsText: {
    fontSize: 14,
    color: Colors.gray.muted,
    width: 350,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 5,
  },
  commentInputContainer: {
    marginVertical: 3,
    backgroundColor: Colors.background.elevated,
    width: 355,
    borderRadius: 19,
    flexDirection: "row",
    paddingVertical: 5,
  },
  commentInput: {
    flex: 1,
    color: Colors.gray.light,
    marginLeft: 6,
    textAlignVertical: "center",
    lineHeight: 20,
    padding: 0,
  },
  sendButton: {
    backgroundColor: Colors.background.surface,
    width: 58,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 18,
  },
  sendButtonText: {
    color: Colors.gray.white,
    fontWeight: 500,
  },
  placeholderPFP: {
    marginLeft: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "gray",
    justifyContent: "flex-start",
  },
  seeMoreButton: {
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.accent.secondary,
    marginRight: 2,
  },
});
