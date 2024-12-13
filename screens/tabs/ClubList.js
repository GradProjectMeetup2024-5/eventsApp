import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../src/constants/Colors";
import Header from "../../components/Header";
import ClubCard from "../../components/ClubCard";

function ClubList() {
  const aboutText = `Nam at imperdiet tortor. Morbi lacinia efficitur sem, quis elem nulla convallis quis. Pellentesque nec sapien auctor, ornare diam id, sodales elit.\n
1. Curabitur consequat erat lorem.
2. vitae aliquam tellus posuere ut.
3. Donec ultrices sapien non vulputate dictum.
Nam at imperdiet tortor. Morbi lacinia efficitur sem, quis elem nulla convallis quis. Pellentesque nec sapien auctor, ornare diam id, sodales elit.\n
1. Curabitur consequat erat lorem.
2. vitae aliquam tellus posuere ut.
3. Donec ultrices sapien non vulputate dictum.
`;

  const navigation = useNavigation();
  const pressHandler = (route) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => pressHandler("Profile")} />

      <ScrollView
        contentContainerStyle={styles.clubListContainer}
        overScrollMode="never"
      >
        {/*need to change ScrollView into FlatList later for performance */}
        <ClubCard
          image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-club-logo-design-template-7363f499d408b8d5aa636f25e135ce56_screen.jpg?ts=1688208799"
          title="Art Club"
          description={aboutText}
          onPress={() => pressHandler("ClubDetails")}
        />
      </ScrollView>
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
