import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import Colors from "../src/constants/Colors";
import EventDetailsHeader from "../components/EventDetailsHeader";

function EventDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <EventDetailsHeader />
    </SafeAreaView>
  );
}

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
});
