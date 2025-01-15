import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import { Shadow } from "react-native-shadow-2";

import TextDetails from "../TextDetails";

import Colors from "../../src/constants/Colors";

function ClubCard({ image, title, description, onPress, clubId }) {
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
            <Text style={styles.clubTitle}>{title}</Text>

            <TextDetails
              description={description}
              maxLines={3}
              textStyle={styles.clubDescription}
              clubCard={true}
            />
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
  },
  clubImg: {
    height: 84,
    width: 84,
    borderRadius: 42,
    backgroundColor: Colors.gray.dark,
  },
  clubDescription: {
    color: Colors.gray.light,
    fontSize: 14,
    fontWeight: "400",
  },
  textContent: {
    paddingLeft: 10,
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 0,
  },
  clubTitle: {
    fontSize: 24,
    color: Colors.accent.primary,
  },
});
