import { View, Image, Text, StyleSheet } from "react-native";
import Colors from "../src/constants/Colors";

function AttendeePictures({
  attendees = [],
  enableAttendeeCount = false,
  pageType = null,
}) {
  const imageWidth = 34;
  const overlap = 12;
  const totalWidth =
    attendees.length <= 3
      ? imageWidth + (attendees.length - 1) * (imageWidth - overlap)
      : imageWidth + 2 * (imageWidth - overlap) + (imageWidth - overlap);

  return (
    <View
      style={[
        styles.container,
        {
          marginVertical: enableAttendeeCount ? 6 : 0,
          width: enableAttendeeCount ? 105 : null,
        },
      ]}
    >
      <View
        style={[
          styles.attendeeImageContainer,
          { width: totalWidth, marginBottom: enableAttendeeCount ? 4 : 0 },
        ]}
      >
        {attendees.slice(0, 3).map((attendee, index) => (
          <Image
            key={index}
            source={{ uri: attendee }}
            style={[
              styles.attendeeImage,
              { left: index * (imageWidth - overlap), zIndex: index - 3 },
            ]}
          />
        ))}

        {attendees.length === 4 && (
          <Image
            source={{ uri: attendees[3] }}
            style={[
              styles.attendeeImage,
              { left: 3 * (imageWidth - overlap), zIndex: 0 },
            ]}
          />
        )}

        {attendees.length > 4 && (
          <View
            style={[
              styles.circle,
              { left: 3 * (imageWidth - overlap), zIndex: 0 },
            ]}
          >
            <Text
              style={[
                styles.circlePlus,
                {
                  color:
                    pageType == "History"
                      ? Colors.gray.medium
                      : Colors.accent.secondary,
                },
              ]}
            >
              +
            </Text>
          </View>
        )}
      </View>
      {enableAttendeeCount && attendees.length > 0 && (
        <Text style={styles.attendeeCount}>{attendees.length} att.</Text>
      )}
    </View>
  );
}

export default AttendeePictures;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: 4,
  },
  attendeeImageContainer: {
    height: 34,
    position: "relative",
    alignSelf: "center",
  },
  attendeeImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    position: "absolute",
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.background.elevated,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circlePlus: {
    fontSize: 16,
    fontWeight: 600,
  },
  attendeeCount: {
    fontSize: 15,
    color: Colors.gray.light,
  },
});
