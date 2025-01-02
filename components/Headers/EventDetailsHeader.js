import { View, Pressable, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import Colors from "../../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function EventDetailsHeader() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [isAttending, setIsAttending] = useState(false);

  function toggleAttending() {
    setIsAttending(!isAttending);
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftButtons}>
        <Pressable onPress={goBack}>
          <Ionicons
            name="arrow-back-outline"
            color={Colors.gray.light}
            size={30}
            style={styles.icons}
          />
        </Pressable>
      </View>

      <Text style={styles.title}>Event</Text>

      <View style={styles.rightButtons}>
        <Pressable>
          <Ionicons
            name="share-outline"
            color={Colors.gray.light}
            size={31}
            style={styles.icons}
          />
        </Pressable>
        {/* <Pressable onPress={toggleAttending}>
          <Ionicons
            name={isAttending ? "add-circle" : "add-circle-outline"}
            color={isAttending ? Colors.accent.secondary : Colors.gray.light}
            size={33}
            style={styles.icons}
          />
        </Pressable> */}
      </View>
    </View>
  );
}

export default EventDetailsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background.elevated,
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderColor: Colors.gray.darkest,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: Colors.gray.light,
    // borderWidth: 1,
  },
  rightButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    // borderWidth: 1,
  },
  leftButtons: {
    flex: 1,
    // borderWidth: 1,
  },
  icons: {
    // paddingHorizontal: 8,
    marginHorizontal: 8,
    // borderWidth: 1,
  },
});
