import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { CheckCircle2, History, Bell, LogOut } from "lucide-react-native";

import AuthContext from "../../context/AuthContext";

import ButtonItem from "../../components/ui/ProfileUi/ButtonItem";
import UserDetails from "../../components/ui/ProfileUi/UserDetails";

import NotificationSettings from "../../components/ui/ProfileUi/Modals/NotificationSettings";
import HistoryPage from "../../components/ui/ProfileUi/Modals/History";
import RequestStatus from "../../components/ui/ProfileUi/Modals/RequestStatus";

export default function Profile({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [rqStatusVisible, setRqStatusVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [notificationsVisible, setNotificationVisible] = useState(false);

  function handleLogOut() {
    setIsLoggedIn(false);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <UserDetails
            image="https://example.com/profile-image.jpg"
            name="Sameer"
            email="sameer@gmail.com"
            phone="01228547392"
            address="Amman, Jordan"
          />

          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.settingsSection}>
            <ButtonItem
              icon={<CheckCircle2 size={16} color="#000000" />}
              onPress={() => {
                setRqStatusVisible(true);
              }}
            >
              Request Status
            </ButtonItem>

            <ButtonItem
              icon={<History size={16} color="#000000" />}
              onPress={() => {
                setHistoryVisible(true);
              }}
            >
              History
            </ButtonItem>
          </View>

          <Text style={styles.sectionTitle}>App Settings</Text>

          <View style={[styles.settingsSection, { marginTop: 16 }]}>
            <ButtonItem
              icon={<Bell size={16} color="#000000" />}
              onPress={() => {
                setNotificationVisible(true);
              }}
            >
              Notifications
            </ButtonItem>

            <ButtonItem
              icon={<LogOut size={16} color="#000000" />}
              onPress={handleLogOut}
            >
              Log Out
            </ButtonItem>
          </View>
        </ScrollView>

        <NotificationSettings
          visible={notificationsVisible}
          onClose={() => {
            setNotificationVisible(false);
          }}
        />
        <HistoryPage
          visible={historyVisible}
          onClose={() => {
            setHistoryVisible(false);
          }}
        />
        <RequestStatus
          visible={rqStatusVisible}
          onClose={() => {
            setRqStatusVisible(false);
          }}
        />
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
});
