import { StyleSheet, View, Image, Text } from "react-native";

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ecebeb",
  },
  detailsContainer: { marginLeft: 12 },
  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "black",
    marginTop: 4,
  },
});
