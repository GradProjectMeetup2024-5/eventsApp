import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

import Colors from "../../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import Comment from "./Comment";
import { showComments, createComment } from "../../../API/action/comment";

function CommentSection({ eventId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentReducer || []);

  const [inputCommentText, setInputCommentText] = useState("");
  const [visibleComments, setVisibleComments] = useState(3);

  useEffect(() => {
    dispatch(showComments(eventId));
  }, [dispatch, eventId, comments]);

  const data = {
    text: inputCommentText,
    // createdAt: new Date().toISOString(),
  };
  const handleSend = () => {
    dispatch(createComment(eventId, data));
    setInputCommentText("");
  };

  const handleSeeMore = () => {
    setVisibleComments((prev) => prev + 3);
  };

  return (
    <View style={styles.commentsContainer}>
      <View style={styles.commentsCard}>
        <View style={styles.commentsTitleContainer}>
          <View style={styles.commentsTitle}>
            <View style={styles.commentsIconContainer}>
              <Ionicons name="chatbubble" size={24} color={Colors.gray.dark} />
            </View>
            <Text style={styles.commentsTitleText}>Comments</Text>
          </View>
        </View>
        <View style={styles.commentInputContainer}>
          <View style={styles.placeholderPFP}>
            {/*Profile picture goes here*/}
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Add Comment"
            placeholderTextColor={Colors.gray.medium}
            value={inputCommentText}
            onChangeText={setInputCommentText}
            multiline={true}
            maxLength={180}
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
        </View>
        <View style={styles.comments}>
          {Array.isArray(comments) && comments.length > 0 ? (
            [...comments]
              .reverse()
              .slice(0, visibleComments)
              .map((comment, index) => (
                <Comment
                  key={index}
                  text={comment?.text}
                  creatorName={comment?.creatorName}
                  createdAt={comment?.createdAt}
                />
              ))
          ) : (
            <View style={styles.emptyComments}>
              <Text style={styles.noCommentsText}>
                No comments yet. Be the first!
              </Text>
              <Ionicons
                name="happy-outline"
                size={30}
                color={Colors.background.subtle}
              />
            </View>
          )}
        </View>
        {Array.isArray(comments) && comments?.length > visibleComments && (
          <Pressable onPress={handleSeeMore} style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See More</Text>
            <Ionicons
              name="arrow-down-outline"
              size={24}
              color={Colors.accent.secondary}
            />
          </Pressable>
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
    // flexDirection: "column-reverse",
  },
  emptyComments: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
