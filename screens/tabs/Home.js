import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import {
  Header,
  getHeaderTitle,
  useHeaderHeight,
} from "@react-navigation/elements";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const sections = [
  { title: "Trending", label: "Curated top picks from this week" },
  { title: "Outdoors", label: "Go outside" },
  { title: "Nature", label: "Discover Jordan’s nature" },
  { title: "Games", label: "Play a game" },
  { title: "Activities", label: "Discover fun activities" },
  { title: "Other", label: "Explore other options" },
];

const apps = [
  {
    title: "Concert",
    description:
      "Discover the best flight deals trending this week. Book now and save big on your next trip.",
    author: "By Travel Experts",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Football",
    description:
      "Stay at the most popular hotels trending this season. Find the perfect accommodation for your travels.",
    author: "By Hotel Gurus",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Park",
    description:
      "Catch the best last-minute flight deals. Perfect for spontaneous travelers looking for great prices.",
    author: "By Trip Masters",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Forest",
    description:
      "Experience luxury at its finest with these trending high-end hotels. Book your stay today.",
    author: "By Luxury Travels",
    image: "https://picsum.photos/50/50",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(sections[0]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApps, setFilteredApps] = useState(apps);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = apps.filter(
      (app) =>
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApps(filtered);
  }, [searchQuery]);

  const renderExploreItem = (item, index) => (
    <View key={index} style={styles.card}>
      <ShimmerPlaceholder
        width={60}
        height={60}
        shimmerStyle={{ borderRadius: 30 }}
        visible={!loading}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      </ShimmerPlaceholder>

      <View style={styles.cardContent}>
        <ShimmerPlaceholder width={160} height={20} visible={!loading}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </ShimmerPlaceholder>

        <ShimmerPlaceholder width={200} height={20} visible={!loading}>
          <Text style={styles.cardDesc}>{item.description}</Text>
        </ShimmerPlaceholder>

        <ShimmerPlaceholder width={150} height={20} visible={!loading}>
          <Text style={styles.cardAuthor}>{item.author}</Text>
        </ShimmerPlaceholder>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <BlurView
          intensity={60}
          tint="light"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(255,255,255,0.5)" },
          ]}
        />
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => setSearchVisible((prev) => !prev)}
        >
          <Ionicons name="search" size={24} color="#666" />
        </TouchableOpacity>
        <Header title="Explore" />
        {searchVisible && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sectionsContainer}
        >
          {sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelected(section)}
              style={
                selected === section
                  ? styles.sectionBtnSelected
                  : styles.sectionBtn
              }
            >
              <Text
                style={
                  selected === section
                    ? styles.sectionBtnTextSelected
                    : styles.sectionBtnText
                }
              >
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: headerHeight },
        ]}
      >
        <Animated.View
          style={styles.section}
          entering={FadeIn.duration(600).delay(400)}
          exiting={FadeOut.duration(400)}
        >
          <ShimmerPlaceholder width={160} height={20} visible={!loading}>
            <Text style={styles.title}>{selected.title}</Text>
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            width={280}
            height={50}
            visible={!loading}
            shimmerStyle={{ marginVertical: 10 }}
          >
            <Text style={styles.label}>{selected.label}</Text>
          </ShimmerPlaceholder>

          {filteredApps.map(renderExploreItem)}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Work Sans",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    fontFamily: "Work Sans",
  },
  sectionsContainer: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionBtn: {
    backgroundColor: "#e0e0e0",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnSelected: {
    backgroundColor: "#19191B",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnText: {
    color: "#000",
    fontWeight: "500",
    fontFamily: "Work Sans",
  },
  sectionBtnTextSelected: {
    color: "#fff",
    fontWeight: "500",
    fontFamily: "Work Sans",
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Work Sans",
  },
  cardDesc: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
    fontFamily: "Work Sans",
  },
  cardAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: "Work Sans",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: "Work Sans",
  },
});
