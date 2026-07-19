import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const features = [
  { id: "1", icon: "infinite-outline", title: "Flexible Tracking" },
  { id: "2", icon: "layers-outline", title: "Organized Space" },
  { id: "3", icon: "stats-chart-outline", title: "Progress at a Glance" },
];

type IoniconName = keyof typeof Ionicons.glyphMap;

export default function HorizontalFeatures() {
  return (
    <View style={styles.container}>
      {features.map((item) => (
        <View key={item.id} style={styles.card}>
          <Ionicons name={item.icon as IoniconName} size={28} color="#000000" />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  title: {
    marginTop: 12,
    color: "#000000",
    textAlign: "center",
    fontWeight: "600",
  },
});
