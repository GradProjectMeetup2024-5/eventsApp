import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import Comment from "./Comment";

function CommentSection({ eventId }) {
  const [inputCommentText, setInputCommentText] = useState("");

  const handleSend = () => {
    if (inputCommentText.trim()) {
      // Place submit logic here, Firas.
      console.log("Comment submitted: ", inputCommentText);
      setInputCommentText("");
    }
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
            // scrollEnabled={false}
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
          <Comment />
          <Comment />
        </View>
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
});
