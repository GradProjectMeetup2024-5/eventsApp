import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Colors from "../../src/constants/Colors";

const tabs = ["Upcoming", "Today", "Tomorrow", "Weekend"];

export default function TabBar({ activeTab, setActiveTab }) {
  const { width } = useWindowDimensions();
  const fontSize = width < 361 ? 11 : width < 411 ? 12 : 14;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              { fontSize },
              activeTab === tab && styles.activeTabText,
            ]}
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
    borderRadius: 12,
    gap: 7,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: Colors.accent.secondary,
  },
  tabText: {
    color: Colors.gray.white,
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.background.surface,
  },
});
