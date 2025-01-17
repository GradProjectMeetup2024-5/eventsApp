import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import Colors from "../../../src/constants/Colors";

const { width } = Dimensions.get("window");

function UserDetails({ name, email, studentId, major, image }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.text}>{studentId}</Text>
        <Text style={styles.text}>{major}</Text>
      </View>
    </View>
  );
}

export default UserDetails;

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    width: width - 32,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray.darkest,
  },
  detailsContainer: { marginLeft: 12 },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.accent.primary,
  },
  text: {
    fontSize: 14,
    color: Colors.gray.light,
    marginTop: 4,
  },
});
