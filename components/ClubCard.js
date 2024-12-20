import { useState } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import { Shadow } from "react-native-shadow-2";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../src/constants/Colors";

function ClubCard({ image, title, description, onPress, clubId }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

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
        <Pressable
          style={styles.cardInfo}
          onPress={onPress}
          // onPress={() => {
          //   onPress?.();
          //   if (isExpanded) {
          //     toggleExpanded();
          //   }
          // }}
        >
          <Image
            style={[styles.clubImg, { transform: [{ translateY: 15 }] }]}
            source={{
              uri: image,
            }}
          />
          <View style={styles.textContent}>
            <Text style={styles.clubTitle}>{title}</Text>

            <Text
              style={styles.clubDescription}
              numberOfLines={isExpanded ? undefined : 6}
            >
              {description}
            </Text>
            <View style={styles.pressableRow}>
              <Pressable onPress={toggleExpanded} hitSlop={20}>
                <Text
                  style={[
                    styles.readMoreButton,
                    { marginTop: isExpanded ? 0 : 5 },
                    {
                      color: isExpanded
                        ? Colors.gray.dark
                        : Colors.accent.secondary,
                    },
                  ]}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </Text>
              </Pressable>
              <Ionicons
                name="chevron-forward-outline"
                color={Colors.gray.light}
                size={27}
                style={styles.chevronIcon}
              />
            </View>
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
    width: 370,
    backgroundColor: Colors.background.surface,
    borderRadius: 8,
    padding: 12,
    // alignItems: "center",
  },
  clubImg: {
    height: 84,
    width: 84,
    borderRadius: 42,
  },
  clubDescription: {
    color: Colors.gray.light,
    // width: 240,
    fontSize: 14,
    fontWeight: "400",
  },
  textContent: {
    paddingLeft: 10,
    width: 270,
  },
  pressableRow: {
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
  readMoreButton: {
    color: Colors.accent.secondary,
    fontWeight: 600,
  },
});
