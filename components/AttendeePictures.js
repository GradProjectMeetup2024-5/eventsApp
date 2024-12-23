import { View, Image, Text, StyleSheet } from "react-native";

function AttendeePictures() {
  return (
    <View style={styles.container}>
      <View style={styles.attendeePictures}></View>
      <Text style={styles.attendeeCount}></Text>
    </View>
  );
}

export default AttendeePictures;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  attendeePictures: {},
  attendeeCount: {},
});
