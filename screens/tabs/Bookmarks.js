import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import PlaceHolderIcon from "../../components/ui/PlaceHolderIcon";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Trips</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.emptyState}>
            {/* You might want to replace this with an actual icon or image */}
            <PlaceHolderIcon />
            <Text style={styles.emptyStateTitle}>No Trips Scheduled</Text>
            <Text style={styles.emptyStateDescription}>
              You have no upcoming Events. Add a trip or browse events.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Home')} // Navigate to Home screen
          >
            <Text style={styles.buttonText}>Browse</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    height: 60,
  },
  headerTitle: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.2,
    color: "#000000",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
  },
  emptyStateTitle: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: 0.16,
    color: "#1D1D1B",
  },
  emptyStateDescription: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: 0.16,
    color: "#8E8E8D",
    maxWidth: 307,
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
  },
  button: {
    backgroundColor: "#DC143C",
    borderRadius: 100,
    padding: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 24,
    color: "#FFFFFF",
  },
});

export default Bookmark;
