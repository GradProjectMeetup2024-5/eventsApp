import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const tabs = ["Upcoming", "Today", "Tomorrow", "Weekend"];

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
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
    backgroundColor: "#1A1A1A",
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
    backgroundColor: "#FF5733",
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000000",
  },
});
