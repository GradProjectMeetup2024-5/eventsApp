import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EventCard() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: 328,
        height: 226,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() => console.log("Travel card clicked")}
        style={{ flex: 1 }}
      >
        <View style={{ position: "relative", width: "100%", height: 127 }}>
          {/* Use a placeholder image */}
          <Image
            source={{
              uri: "https://via.placeholder.com/328x127?text=Placeholder+Image",
            }}
            style={{ width: "100%", height: 127, resizeMode: "cover" }}
            onError={(e) =>
              console.log("Error loading image", e.nativeEvent.error)
            }
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            gap: 12,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "column", gap: 8, flexGrow: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  flexGrow: 1,
                  textAlign: "left",
                }}
              >
                Event
              </Text>
              <Icon name="chevron-right" size={16} color="black" />
            </View>
            <Text style={{ fontSize: 10, color: "#9CA3AF", textAlign: "left" }}>
              Event Description
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 25,
                backgroundColor: "#AFB1B6",
                borderRadius: 4,
              }}
              onPress={() => console.log("Attend button clicked")}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: "red",
                }}
              >
                Attend
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
