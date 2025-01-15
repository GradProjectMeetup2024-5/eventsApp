import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Callout } from "react-native-maps";
import Colors from "../../src/constants/Colors";
import Header from "../../components/Headers/Header";
import RefreshableScrollView from "../../components/RefreshableScrollView";
import { showEvents } from "../../API/action/event";
import * as actionType from "../../API/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "../../assets/map/marker-1.png";
const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const allEvents = useSelector((state) => state.event.events || []);
  console.log(allEvents);
  const fetchEvents = () => {
    dispatch(showEvents({ type: actionType.FETCH_ALL }));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
        >
          {allEvents?.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker?.latitude || 32.0401803456018,
                longitude: marker?.longitude || 35.900398904295194,
              }}
              title={marker?.event_name}
              description={marker?.event_desc}
              draggable
              onDragEnd={(e) =>
                alert(
                  `New position: ${JSON.stringify(e.nativeEvent.coordinate)}`
                )
              }
            >
              <Callout onPress={() => console.log("Callout pressed!")}>
                <View style={[styles.calloutContainer, { width: 250 }]}>
                  <Text style={styles.calloutTitle}>
                    {marker?.event_name || "No Name Available"}
                  </Text>
                  <Text style={styles.calloutDescription}>
                    {marker?.event_desc || "No Description Available"}
                  </Text>
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
    width: 250,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: "#555",
  },
});
