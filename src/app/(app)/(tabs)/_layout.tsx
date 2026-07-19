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
      initialRouteName="users"
      screenOptions={{
        tabBarShowLabel: false,
        header: () => <CustomHeader title="Owe Me" />,
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
          paddingHorizontal: 12,
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
          href: null,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Users" icon="people-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="debt-management"
        options={{
          title: "Debts",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Debts"
              icon="document-text-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Pay",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Pay" icon="card-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="History" icon="time-outline" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeContainer: {
    flex: 1,
    minWidth: 92,
    minHeight: 56,
    marginTop: 16,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
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
});
