import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ClubDetailsHeader from "../components/ClubDetailsHeader";
import AltClubCard from "../components/AltClubCard";

import Colors from "../src/constants/Colors";

function ClubDetails() {
  const navigation = useNavigation();
  const pressHandler = (route) => {
    navigation.navigate(route);
  };
  const [joinState, setJoinState] = useState(false);
  function joinHandler() {
    setJoinState(!joinState);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ClubDetailsHeader />
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
              <Text style={styles.countNum}>235</Text>
              <Text style={styles.countLabel}>members</Text>
            </View>
            <View style={styles.count}>
              <Text style={styles.countNum}>25</Text>
              <Text style={styles.countLabel}>events</Text>
            </View>
          </View>
          <Pressable
            style={joinState ? styles.joinedButton : styles.joinButton}
            onPress={joinHandler}
          >
            <Text style={joinState ? styles.joinedText : styles.joinText}>
              {joinState ? "Joined" : "Join"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.clubBody}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Events</Text>
          <Pressable onPress={() => pressHandler("AllEvents")}>
            <Text
              style={[styles.sectionTitle, { color: Colors.accent.secondary }]}
            >
              See All
            </Text>
          </Pressable>
        </View>
        <View style={styles.eventScrollView}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            bounces={false}
          >
            <AltClubCard />
            <AltClubCard />
          </ScrollView>
        </View>
      </View>
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
    // borderWidth: 1,
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
    // borderWidth: 1,
    marginBottom: -3,
  },
  countLabel: {
    fontSize: 14,
    color: Colors.gray.light,
    fontWeight: "400",
    // borderWidth: 1,
  },
  clubInfo: {
    width: 180,
  },
  joinButton: {
    backgroundColor: Colors.accent.secondary,
    height: 28,
    // width: 167,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  joinedButton: {
    backgroundColor: Colors.background.base,
    height: 28,
    // width: 167,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.accent.secondary,
  },
  joinText: {
    fontSize: 16,
    color: Colors.gray.white,
  },
  joinedText: {
    fontSize: 16,
    color: Colors.accent.secondary,
  },
  clubBody: {
    flex: 1,
    // alignItems: "center",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 22,
    // width: "100%",
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.gray.light,
  },
  eventScrollView: {
    alignItems: "center",
    flexDirection: "row",
  },
});
