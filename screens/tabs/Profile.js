import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Pressable,
} from "react-native";
import {
  Pencil,
  CheckCircle2,
  Languages,
  Bell,
  Moon,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: "https://example.com/profile-image.jpg" }}
                style={styles.profileImage}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Sameer</Text>
                <Text style={styles.profileEmail}>sameer@gmail.com</Text>
                <Text style={styles.profilePhone}>01228547392</Text>
                <Text style={styles.profileLocation}>Amman, Jordan</Text>
              </View>
            </View>
          </View>

          <View style={styles.settingsSection}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Pencil size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>Profile details</Text>
              <View style={styles.chevron} />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <CheckCircle2 size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>Approval Requests</Text>
              <View style={styles.chevron} />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Pencil size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>History</Text>
              <View style={styles.chevron} />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <CheckCircle2 size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>Bookmarked</Text>
              <View style={styles.chevron} />
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>App Settings</Text>

          <View style={styles.settingsSection}>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Languages size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>Language</Text>
              <View style={styles.chevron} />
            </Pressable>

            <Pressable style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Bell size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>Notifications Management</Text>
              <View style={styles.chevron} />
            </Pressable>

            <View style={styles.settingItem}>
              <View style={styles.settingIcon}>
                <Moon size={16} color="#000000" />
              </View>
              <Text style={styles.settingText}>Dark mode</Text>
              <Switch />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingBottom: 80,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileDetails: {
    marginLeft: 12,
  },
  profileName: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 18,
    color: "#000000",
  },
  profileEmail: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
  profilePhone: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  profileLocation: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  settingsSection: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 14,
    color: "#000000",
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  settingIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#000000",
    marginLeft: 8,
    flex: 1,
  },
  chevron: {
    width: 24,
    height: 24,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#000000",
    transform: [{ rotate: "45deg" }],
  },
});
