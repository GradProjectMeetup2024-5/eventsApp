import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

const sections = [
  { title: "Trending", label: "Curated top picks from this week" },
  { title: "Outdoors", label: "Go outside" },
  { title: "Nature", label: "Discover Jordan's nature" },
  { title: "Games", label: "Play a game" },
  { title: "Activities", label: "Discover fun activities" },
  { title: "Other", label: "Explore other options" },
]

const apps = [
  {
    title: "Concert",
    description: "Discover the best flight deals trending this week. Book now and save big on your next trip.",
    author: "By Travel Experts",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Football",
    description: "Stay at the most popular hotels trending this season. Find the perfect accommodation for your travels.",
    author: "By Hotel Gurus",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Park",
    description: "Catch the best last-minute flight deals. Perfect for spontaneous travelers looking for great prices.",
    author: "By Trip Masters",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Forest",
    description: "Experience luxury at its finest with these trending high-end hotels. Book your stay today.",
    author: "By Luxury Travels",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Forest",
    description: "Experience luxury at its finest with these trending high-end hotels. Book your stay today.",
    author: "By Luxury Travels",
    image: "https://picsum.photos/50/50",
  },
  {
    title: "Forest",
    description: "Experience luxury at its finest with these trending high-end hotels. Book your stay today.",
    author: "By Luxury Travels",
    image: "https://picsum.photos/50/50",
  },
]

export default function Component() {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(sections[0])
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredApps, setFilteredApps] = useState(apps)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const filtered = apps.filter(
      (app) =>
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredApps(filtered)
  }, [searchQuery])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setSearchVisible((prev) => !prev)}
        >
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sectionsContainer} contentContainerStyle={{ paddingRight: 16 }}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sectionButton,
              selected === section && styles.sectionButtonSelected,
            ]}
            onPress={() => setSelected(section)}
          >
            <Text
              style={[
                styles.sectionButtonText,
                selected === section && styles.sectionButtonTextSelected,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>{selected.title}</Text>
        <Text style={styles.sectionLabel}>{selected.label}</Text>
        {filteredApps.map((app, index) => (
          <View key={index} style={styles.appCard}>
            <View style={styles.appCardContent}>
              <Image source={{ uri: app.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{app.title}</Text>
                <Text style={styles.appDescription}>{app.description}</Text>
                <Text style={styles.cardAuthor}>{app.author}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  searchButton: {
    padding: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  sectionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sectionButton: {
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    paddingBottom: 8,
  },
  sectionButtonSelected: {
    backgroundColor: '#007AFF',
  },
  sectionButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionButtonTextSelected: {
    color: '#ffffff',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  appCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  appCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    flexShrink: 1,
  },
  cardAuthor: {
    fontSize: 12,
    color: '#999',
  },
})