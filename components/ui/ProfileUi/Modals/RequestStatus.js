import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { X } from "lucide-react-native";

const requestStatuses = [
  { id: "1", eventName: "Hackathon", status: "Rejected", date: "2024-9-25" },
  { id: "2", eventName: "Career Fair", status: "Approved", date: "2024-10-20" },
  { id: "3", eventName: "Tech Meetup", status: "Pending", date: "2024-11-30" },
];

const RequestStatus = ({ visible, onClose }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={[styles.status, styles[item.status.toLowerCase()]]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#000000" />
          </Pressable>
          <Text style={styles.modalTitle}>Request Status</Text>
          <FlatList
            data={requestStatuses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
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
    maxHeight: "80%",
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
  list: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontWeight: "bold",
  },
  pending: {
    color: "#FFA500",
  },
  approved: {
    color: "#008000",
  },
  rejected: {
    color: "#FF0000",
  },
});

export default RequestStatus;
