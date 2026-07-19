import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title?: string;
};

export default function CustomHeader({ title = "Owe Me" }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoMark}>
          <Ionicons name="wallet-outline" size={20} color="#0F172A" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
});
