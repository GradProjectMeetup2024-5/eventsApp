import { View, Text, StyleSheet } from "react-native";

import Colors from "../../../src/constants/Colors";

function Comment({ text, creatorName, createdAt }) {
  return (
    <View style={styles.container}>
      <View style={styles.commentInfo}>
        <View style={styles.userContainer}>
          <View style={styles.placeholderPFP} />
          <Text style={styles.userName}>{creatorName}</Text>
          {/*should add a character limit here at some point */}
        </View>
        <Text style={styles.commentDate}>{createdAt}</Text>
        {/*need to figure out what time format to use*/}
        {/*examples: Today at 2:34 PM, Yesterday at 9:33 AM, 2 Days ago, 3 Weeks ago*/}
      </View>
      <Text style={styles.commentText}>
        {/* commment where I test the character limit and how to style the comments
        component accordingly */}
        {text}
      </Text>
    </View>
  );
}

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 8,
    width: 346,
  },
  commentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeholderPFP: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "pink",
    justifyContent: "flex-start",
  },
  userName: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.gray.light,
    width: 180,
  },
  commentDate: {
    fontSize: 12,
    color: Colors.gray.dark,
  },
  commentText: {
    marginTop: 5,
    color: Colors.gray.muted,
    fontSize: 14,
    lineHeight: 20,
    padding: 0,
  },
});
