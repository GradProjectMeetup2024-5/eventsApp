import React, { useEffect, useState } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import profileImage from "../../assets/image 86.png";
import back from '../../assets/eventplaceholder.png'
export default function EventCard({
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventOrganizer,
  eventImage,
}) {
  const [imageError, setImageError] = useState(false);



  const handleImageError = (e) => {
    setImageError(true);
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.cardContent,
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <View style={styles.imageContainer}>
          {imageError ? (
            <View style={styles.errorImagePlaceholder}>
              <Text style={styles.errorText}>Image Error</Text>
            </View>
          ) : (
            <Image
              source={back}
              style={styles.image}
              onError={handleImageError}
            />
          )}
          <View style={styles.iconBackground}>
            <Icon name="share-alt" size={20} color="white" style={styles.shareIcon} />
          </View>
          <View style={styles.iconBackground}>
            <Icon name="heart" size={20} color="white" style={styles.heartIcon} />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.eventName}>{eventName}</Text>
            <Icon name="chevron-right" size={16} color="white" />
          </View>
          <Text style={styles.eventDescription}>
            {eventDate} · {eventTime} · {eventLocation}
          </Text>
          <View style={styles.footerContainer}>
            <Image source={profileImage} style={styles.profileImage} />
            <Text style={styles.eventOrganizer}>{eventOrganizer}</Text>
            <Pressable style={styles.attendButton}>
              <Text style={styles.attendButtonText}>Attend</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 380,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconBackground: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  shareIcon: {
    marginRight: 30,
  },
  heartIcon: {
    marginLeft: 30,
  },
  errorImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 12,
    gap: 8,
    width: "100%",
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  eventDescription: {
    fontSize: 12,
    color: "white",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileImage: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  eventOrganizer: {
    fontSize: 12,
    color: "white",
    flex: 1,
  },
  attendButton: {
    width: 50,
    height: 25,
    backgroundColor: "red",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  attendButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
});
