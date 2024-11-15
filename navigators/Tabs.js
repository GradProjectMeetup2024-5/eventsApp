import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Platform,
} from "react-native";

import Home from "../screens/tabs/Home";
import Profile from "../screens/tabs/Profile";
import Bookmarks from "../screens/tabs/Bookmarks";
import Create from "../screens/tabs/Create";

import Icons from "../src/constants/Icons";

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, focused, name }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "#DC143C" : "#aaa",
        }}
      />
      <Text
        style={{
          color: focused ? "#DC143C" : "#aaa",
          fontSize: 12,
          paddingTop: 3,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 10 : 5, // Lowered the bottom position
          right: 20,
          left: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 20,
          height: 70, // Reduced the height to make the nav bar thinner
          paddingTop: Platform.OS === "ios" ? 20 : 0, // Adjusted padding to match new height
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Explore" icon={Icons.home} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="My Events"
        component={Bookmarks}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="My Events" icon={Icons.bookmark} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Create" icon={Icons.plus} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Profile" icon={Icons.profile} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    flex: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
