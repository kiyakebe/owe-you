import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

import CustomHeader from "@/components/CustomHeader";

type IoniconName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  focused,
  title,
  icon,
}: {
  focused: boolean;
  title: string;
  icon: IoniconName;
}) {
  if (focused) {
    return (
      <View style={styles.activeContainer}>
        <Ionicons name={icon} size={20} color="black" />
        <Text style={styles.activeText}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.inactiveContainer}>
      <Ionicons name={icon} size={24} color="black" />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        header: () => <CustomHeader userName="Kiya" />,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 60,
          marginTop: 20,
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderRadius: 50,
          marginHorizontal: 15,
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginBottom: insets.bottom + 10,
          height: 60,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon="home-outline" />
          ),
        }}
      />

      <Tabs.Screen
        name="current"
        options={{
          title: "Current",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Current" icon="time-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Habits" icon="list-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon="person-outline" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeContainer: {
    flex: 1,
    minWidth: 100,
    minHeight: 56,
    marginTop: 16,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inactiveContainer: {
    minHeight: 56,
    aspectRatio: 1,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  activeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  inactiveText: {
    color: "#A8B5DB",
    fontSize: 12,
    fontWeight: "600",
  },
});
``;
