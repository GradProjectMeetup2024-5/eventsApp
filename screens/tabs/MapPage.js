import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Callout } from "react-native-maps";
import Colors from "../../src/constants/Colors";
import Header from "../../components/Headers/Header";
import RefreshableScrollView from "../../components/RefreshableScrollView";

const App = () => {
  const markers = [
    {
      id: 1,
      latitude: 32.04018,
      longitude: 35.90039,
      title: "First Marker",
      description: "This is the first marker description.",
      // icon: require("../../assets/map/marker-1.png"),
    },
    {
      id: 2,
      latitude: 32.04518,
      longitude: 35.90539,
      title: "Second Marker",
      description: "This is the second marker description.",
      // icon: require("../../assets/map/marker-2.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
      // searchText={searchText}
      // onSearchChange={setSearchText}
      />
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 32.0401803456018,
            longitude: 35.900398904295194,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          customMapStyle={mapStyle}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              // icon={marker.icon}
              draggable
              onDragEnd={(e) =>
                alert(
                  `New position: ${JSON.stringify(e.nativeEvent.coordinate)}`
                )
              }
            >
              <Callout>
                <View>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{marker.title}</Text>
                    <Text>{marker.description}</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "building",
    elementType: "geometry",
    stylers: [{ color: "#d59563" }],
  },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
    borderWidth: 1,
  },
  mapStyle: {
    flex: 1,
  },
  calloutContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
