import { useState } from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";

import Colors from "../src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function TextDetails({
  description,
  maxLines = 6,
  textStyle,
  clubCard = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  function handleTextLayout(event) {
    if (event.nativeEvent.lines.length > maxLines) {
      setShouldShowButton(true);
    } else {
      setShouldShowButton(false);
    }
  }

  return (
    <View>
      <Text
        style={[styles.description, textStyle]}
        numberOfLines={isExpanded ? undefined : maxLines}
        onTextLayout={handleTextLayout}
      >
        {description}
      </Text>
      <View style={styles.rowEnd}>
        {shouldShowButton ? (
          <View style={styles.buttonContainer}>
            <Pressable onPress={toggleExpanded} hitSlop={20}>
              <Text
                style={[
                  styles.readMoreButton,
                  {
                    color:
                      isExpanded && clubCard
                        ? Colors.gray.dark
                        : Colors.accent.secondary,
                  },
                ]}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.buttonContainer} />
        )}
        {clubCard && (
          <View style={styles.chevronContainer}>
            <Ionicons
              name="chevron-forward-outline"
              color={Colors.gray.light}
              size={27}
              style={styles.chevronIcon}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default TextDetails;

const styles = StyleSheet.create({
  description: {
    color: Colors.gray.light,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  readMoreButton: {
    fontWeight: "600",
  },
  rowEnd: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    // borderWidth: 1,
  },
  chevronIcon: {
    margin: 0,
    padding: 0,
    alignSelf: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 4,
    // borderWidth: 1,
  },
  chevronContainer: {
    flex: 1,
    alignItems: "center",
    // borderWidth: 1,
    // justifyContent: "flex-end",
  },
});
