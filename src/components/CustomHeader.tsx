import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  userName: string;
  avatarUrl?: string;
};

export default function CustomHeader({ userName, avatarUrl }: Props) {
  const insets = useSafeAreaInsets();

  return (
    // <View style={[styles.container, { marginTop: insets.top }]}>
    <View style={styles.container}>
      {/* Left: Profile */}
      <View style={styles.left}>
        <Image
          source={{
            uri:
              avatarUrl ??
              "https://ui-avatars.com/api/?name=User&background=E5E7EB",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Right: Notification */}
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="#111827" />
      </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});
