import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { Icons } from "../../src/constants/Icons";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 24, height: 24 }}
      />
      <Text style={{ color: color, fontSize: 10 }}>{name}</Text>
    </View>
  );
};

const TabsComponent = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#DC143C", // Crimson Red
        tabBarInactiveTintColor: "#19191B",
        tabBarStyle: {
          backgroundColor: "#D0D0D0", // warm white
          borderTopWidth: 1,
          borderTopColor: "#F5F5F5", // Whisper White
          height: "8%", // responsive height
          paddingBottom: -10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.search}
              color={color}
              name="Explore"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.bookmark}
              color={color}
              name="Trips"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsComponent;
