import { View, Image, Text, StyleSheet } from "react-native";
import Colors from "../src/constants/Colors";

// Helper to generate a random picsum URL
const getRandomPic = () => {
  const w = 90 + Math.floor(Math.random() * 20); // 90-109
  const h = 90 + Math.floor(Math.random() * 20); // 90-109

  return `https://picsum.photos/${w}/${h}?random=${Math.floor(
    Math.random() * 10000
  )}`;
};

function AttendeePictures({
  attendees = 0,
  enableAttendeeCount = false,
  pageType = null,
}) {
  const imageWidth = 34;
  const overlap = 12;

  if (attendees === 0) {
    // Placeholder view
    return (
      <View
        style={[
          styles.container,
          { width: enableAttendeeCount ? 105 : null, height: 34 },
        ]}
      />
    );
  }

  const showImages = Math.min(attendees, 4);
  const totalWidth =
    showImages <= 3
      ? imageWidth + (showImages - 1) * (imageWidth - overlap)
      : imageWidth + 2 * (imageWidth - overlap) + (imageWidth - overlap);

  // Generate random images for display
  const images = Array.from({ length: showImages }, getRandomPic);

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
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={[
              styles.attendeeImage,
              { left: index * (imageWidth - overlap), zIndex: index - 3 },
            ]}
          />
        ))}

        {attendees > 4 && (
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
                    pageType === "History"
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
      {enableAttendeeCount && attendees > 0 && (
        <Text style={styles.attendeeCount}>{attendees} att.</Text>
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
