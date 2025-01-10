import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import Colors from "../../src/constants/Colors";
import Header from "../../components/Headers/Header";
import ClubCard from "../../components/Cards/ClubCard";
import RefreshableScrollView from "../../components/RefreshableScrollView";

import { allClubs } from "../../API/action/club";
import * as actionType from "../../API/actionTypes";

function ClubList() {
  const [loading, setLoading] = useState(true);
  const clubs = useSelector((state) => state.clubReducer.clubs); // Ensure to access clubs property
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchClubs = async () => {
    setLoading(true); // Set loading to true
    try {
      await dispatch(allClubs());
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <RefreshableScrollView
        onRefresh={fetchClubs}
        style={styles.clubListContainer}
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : clubs?.length > 0 ? (
          clubs?.map((club) => (
            <ClubCard
              key={club.id}
              image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799"
              title={club.name}
              description={club.desc}
              onPress={() =>
                navigation.navigate("ClubDetails", { clubId: club.id })
              }
            />
          ))
        ) : (
          <Text>No clubs were found</Text>
        )}
      </RefreshableScrollView>
    </SafeAreaView>
  );
}

export default ClubList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  clubListContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
});
