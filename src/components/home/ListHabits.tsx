// import {
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// type HomeHabitListItem = {
//   id: string;
//   name: string;
//   activitiesCount: number;
// };

// const habits: HomeHabitListItem[] = [
//   { id: "1", name: "Morning Routine", activitiesCount: 5 },
//   { id: "2", name: "Workout", activitiesCount: 3 },
//   { id: "3", name: "Reading", activitiesCount: 2 },
// ];

// export default function HomeHabitList() {
//   const renderItem = ({ item }: { item: HomeHabitListItem }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => console.log(item.name)}
//     >
//       <View>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.count}>{item.activitiesCount} activities</Text>
//       </View>
//       <Ionicons name="chevron-forward-outline" size={22} color="#64748B" />
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={habits}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   listContainer: { paddingHorizontal: 14, paddingVertical: 16 },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   name: { color: "#334155" },
//   count: { color: "#64748B", marginTop: 4 },
// });

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HomeHabitListItem = {
  id: string;
  name: string;
  activitiesCount: number;
};

const habits: HomeHabitListItem[] = [
  { id: "1", name: "Morning Routine", activitiesCount: 5 },
  { id: "2", name: "Workout", activitiesCount: 3 },
  { id: "3", name: "Reading", activitiesCount: 2 },
];

export default function HomeHabitList() {
  return (
    <View style={styles.listContainer}>
      {habits.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => console.log(item.name)}
        >
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.count}>{item.activitiesCount} activities</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={22} color="#64748B" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: { paddingHorizontal: 14, paddingVertical: 16 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  name: { color: "#334155", fontWeight: "600" },
  count: { color: "#64748B", marginTop: 4 },
});
