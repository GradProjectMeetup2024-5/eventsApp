'use client'

import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import TravelCard from '../../components/ui/eventsCard'

const sections = [
  { title: 'Trending' },
  { title: 'Outdoor' },
  { title: 'Indoor' },
  { title: 'Sports' },
]

export default function Explore() {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(sections[0])

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
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16, paddingTop: 40 }}>
      {/* Title and Search Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Explore</Text>
        <View style={{ flex: 1, marginLeft: 16, position: 'relative' }}>
          <TextInput
            placeholder="Search"
            style={{
              width: '100%',
              height: 40,
              paddingLeft: 40,
              paddingRight: 16,
              borderColor: '#D1D5DB',
              borderWidth: 1,
              borderRadius: 20,
            }}
          />
          <FontAwesome
            name="search"
            size={20}
            color="#9CA3AF"
            style={{
              position: 'absolute',
              left: 12,
              top: 10,
            }}
          />
        </View>
      </View>

      {/* Pills Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSectionSelect(section)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              height: 32,
              marginRight: 8,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: selected === section ? 'red' : '#D1D5DB',
              backgroundColor: selected === section ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '500', color: selected === section ? 'red' : '#6B7280' }}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content Section */}
      <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>{selected.title}</Text>
        {loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 256 }}>
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                <TravelCard />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}