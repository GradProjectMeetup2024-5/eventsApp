import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CheckCircle2, History, Bell, LogOut } from "lucide-react-native";

import AuthContext from "../context/AuthContext";

import ButtonItem from "../components/ui/ProfileUi/ButtonItem";
import UserDetails from "../components/ui/ProfileUi/UserDetails";

import { useDispatch } from "react-redux";
import * as actionType from "../API/actionTypes";

export default function Profile({ navigation }) {
  // const { setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  console.log(user?.user?.user?.name);
  function handleLogOut() {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
    navigation.navigate("LogIn");
  }

  function handleBackToHome() {
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={handleBackToHome} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Profile</Text>
        </Pressable>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <UserDetails
            image="https://example.com/profile-image.jpg"
             name={user.user.user.name}
             email={user.user.user.email}
            phone="01228547392"
            address="Amman, Jordan"
          />

          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.settingsSection}>
            <ButtonItem
              icon={<CheckCircle2 size={16} color="#000000" />}
              style={styles.buttonItem}
            >
              Request Status
            </ButtonItem>

            <ButtonItem
              icon={<History size={16} color="#000000" />}
              style={styles.buttonItem}
            >
              History
            </ButtonItem>
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
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
