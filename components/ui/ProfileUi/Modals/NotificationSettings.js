import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { X } from "lucide-react-native";

const NotificationSettings = ({ visible, onClose }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [newEvents, setNewEvents] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState(true);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#000000" />
          </Pressable>
          <Text style={styles.modalTitle}>Notification Settings</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Event Reminders</Text>
            <Switch
              value={eventReminders}
              onValueChange={setEventReminders}
              disabled={!pushEnabled}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>New Events</Text>
            <Switch
              value={newEvents}
              onValueChange={setNewEvents}
              disabled={!pushEnabled}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Status Updates</Text>
            <Switch
              value={statusUpdates}
              onValueChange={setStatusUpdates}
              disabled={!pushEnabled}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  settingText: {
    fontSize: 16,
  },
});

export default NotificationSettings;
