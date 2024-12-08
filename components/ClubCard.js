import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import { Shadow } from "react-native-shadow-2";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../src/constants/Colors";

function ClubCard({ image, title, description, onPress }) {
  return (
    <View style={styles.container}>
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
        <Pressable style={styles.cardInfo} onPress={onPress}>
          <Image
            style={styles.clubImg}
            source={{
              uri: image,
            }}
          />
          <View style={styles.textContent}>
            <View style={styles.titleRow}>
              <Text style={styles.clubTitle}>{title}</Text>
              <Ionicons
                name="chevron-forward-outline"
                color={Colors.gray.light}
                size={27}
                style={styles.chevronIcon}
              />
            </View>
            <Text style={styles.clubDescription}>{description}</Text>
          </View>
        </Pressable>
      </Shadow>
    </View>
  );
}

export default ClubCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 11,
  },
  cardInfo: {
    flexDirection: "row",
    height: 160,
    width: 370,
    backgroundColor: Colors.background.surface,
    borderRadius: 8,
    padding: 12,
  },
  clubImg: {
    height: 84,
    width: 84,
    borderRadius: 42,
  },
  clubDescription: {
    color: Colors.gray.light,
    width: 240,
    fontSize: 14,
    fontWeight: "400",
  },
  textContent: {
    paddingLeft: 10,
    width: 270,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chevronIcon: {
    marginLeft: 0,
  },
  clubTitle: {
    fontSize: 24,
    color: Colors.accent.primary,
  },
});
