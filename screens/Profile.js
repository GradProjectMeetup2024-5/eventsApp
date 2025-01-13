import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CheckCircle2, History, Bell, LogOut } from "lucide-react-native";

import ButtonItem from "../components/ui/ProfileUi/ButtonItem";
import UserDetails from "../components/ui/ProfileUi/UserDetails";

import { useDispatch } from "react-redux";
import * as actionType from "../API/actionTypes";

import * as SecureStore from "expo-secure-store";

import Friends from "../components/ui/ProfileUi/Friend";
import Colors from "../src/constants/Colors";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(SecureStore.getItemAsync("profile"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("profile");
        if (storedUser) {
          const userObject = JSON.parse(storedUser);
          setUser(userObject);
        } else {
          console.log("No user data found in SecureStore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  async function handleLogOut() {
    console.log("delete");
    await SecureStore.deleteItemAsync("profile");
    dispatch({ type: actionType.LOGOUT });
    navigation.navigate("LogIn");
  }

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Profile</Text>
        </Pressable>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <UserDetails
            image="https://example.com/profile-image.jpg"
            name={user?.user?.user?.name}
            email={user?.user?.user?.email}
            studentId={user?.user?.user?.studentId}
            major={user?.user?.user?.major}
          />

          <Text style={styles.sectionTitle}>Friends</Text>

          <View>
            <Friends/>
          </View>

          <Text style={styles.sectionTitle}>App Settings</Text>

          <View style={styles.settingsSection}>
            <ButtonItem
              icon={<Bell size={16} color="#000000" />}
              style={styles.buttonItem}
            >
              Notifications
            </ButtonItem>

            <ButtonItem
              icon={<LogOut size={16} color="#000000" />}
              style={styles.buttonItem}
              onPress={handleLogOut}
            >
              Log Out
            </ButtonItem>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  settingsSection: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
  },
  sectionTitle: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 24,
    marginBottom: 16,
  },
  buttonItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
});
