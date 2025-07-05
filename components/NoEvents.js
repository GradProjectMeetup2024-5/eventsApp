import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../src/constants/Colors";

function NoEvents({
  icon,
  message,
  location = "Explore",
  buttonText = "Find Events",
}) {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const marginTop = height < 641 ? 30 : height < 893 ? 60 : 80;
  const marginBottom =
    height < 641 ? 60 : height < 845 ? 160 : height < 893 ? 220 : 240;
  const iconWidth = height < 641 ? 180 : 220;
  const iconSize = height < 641 ? 100 : 120;
  const borderRadius = height < 641 ? 90 : 110;

  return (
    <View style={[styles.noEventContainer, { marginTop }]}>
      <View
        style={[
          styles.noEventIconContainer,
          { width: iconWidth, height: iconWidth, borderRadius: borderRadius },
        ]}
      >
        <Ionicons name={icon} size={iconSize} color={Colors.accent.secondary} />
      </View>
      <Text style={[styles.noEventText, { marginBottom }]}>{message}</Text>
      <Pressable
        style={styles.exploreButtonContainer}
        onPress={() => navigation.navigate("Tabs", { screen: location })}
      >
        <View style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>{buttonText}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default NoEvents;

const styles = StyleSheet.create({
  noEventContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noEventIconContainer: {
    // width: 220,
    // height: 220,
    // borderRadius: 110,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.surface,
  },
  noEventText: {
    fontSize: 16,
    color: Colors.gray.light,
    textAlign: "center",
    lineHeight: 20,
    width: 300,
    height: 65,
  },
  exploreButtonContainer: {
    width: 200,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray.darkest,
  },
  exploreButtonText: {
    color: Colors.gray.light,
    fontSize: 13,
  },
});
