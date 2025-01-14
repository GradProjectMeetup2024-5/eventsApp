import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../src/constants/Colors";

const tabs = ["Upcoming", "Today", "Tomorrow", "Weekend"];

export default function TabBar({ activeTab, setActiveTab }) { // Accept props
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)} // Use the passed function
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background.surface,
    padding: 4,
    borderRadius: 10,
    gap: 4,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.accent.secondary,
  },
  tabText: {
    color: Colors.gray.white,
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.background.surface,
  },
});
