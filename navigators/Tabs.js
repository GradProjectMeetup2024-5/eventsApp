import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Explore from "../screens/tabs/Explore";
import ClubList from "../screens/tabs/ClubList";
import MapPage from "../screens/tabs/MapPage";
import AttendingPage from "../screens/tabs/AttendingPage";
import Create from "../screens/tabs/Create";

import Icons from "../src/constants/Icons";
import Colors from "../src/constants/Colors";

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, focused, name }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Ionicons
        size={34}
        name={icon}
        color={focused ? Colors.accent.primary : Colors.gray.dark}
      />
      <Text
        style={{
          color: focused ? Colors.accent.primary : Colors.gray.dark,
          fontSize: 12,
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
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.background.elevated,
          height: 70,
          borderTopWidth: 1,
          borderTopColor: Colors.gray.darkest,
          paddingTop: Platform.OS === "ios" ? 25 : 0,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Explore" icon="compass-outline" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Attending"
        component={AttendingPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="Attending"
              icon="calendar-outline"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="Create"
              icon="add-circle-outline"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Clubs"
        component={ClubList}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Clubs" icon="people-outline" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Map" icon="location-outline" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
