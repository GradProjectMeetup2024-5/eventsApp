import { View, Pressable, Text, Image, StyleSheet } from "react-native";

import TextDetails from "../TextDetails";

import Colors from "../../src/constants/Colors";
import CustomShadow from "../CustomShadow";

function ClubCard({ image, title, description, onPress, clubId }) {
  return (
    <View style={styles.container}>
      <CustomShadow>
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
      </CustomShadow>
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
