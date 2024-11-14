import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const sections = [
  { title: 'Trending' },
  { title: 'Outdoor' },
  { title: 'Indoor' },
  { title: 'Sports' },
  { title: 'Kids' },
];

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
  const [filteredApps, setFilteredApps] = useState(apps)
  const navigation = useNavigation()
  const scrollViewRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionSelect = (section) => {
    setSelected(section)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Title and Search Bar */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
        />
      </View>

      {/* Pills Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSectionSelect(section)}
            style={[
              {
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                height: 32,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selected === section ? 'red' : '#CBD5E1',
              },
            ]}
          >
            <Text
              style={{
                color: selected === section ? 'red' : '#CBD5E1',
                fontSize: 12,
                fontWeight: '500',
                textAlign: 'center',
                fontFamily: 'Roboto',
              }}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ paddingBottom: 20 }} />
      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { paddingBottom: 10 }]}>{selected.title}</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 10,
    paddingTop: 10,
  },
  pillsContainer: {
    width: '100%',
    paddingVertical: 10,
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