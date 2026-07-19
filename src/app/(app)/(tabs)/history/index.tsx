import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useOutstandingTotal, useUsersWithDebts } from "@/hooks/useDebtSelectors";
import { formatCurrency } from "@/utils/format";
import type { User } from "@/types/debt";

function HistoryUserRow({ user }: { user: User }) {
  const router = useRouter();
  const outstanding = useOutstandingTotal(user.id);

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.75}
      onPress={() => router.push(`/(app)/(tabs)/history/${user.id}`)}
    >
      <View style={styles.rowLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.meta}>
            {outstanding > 0
              ? `${formatCurrency(outstanding)} outstanding`
              : "Fully settled"}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
}

export default function HistoryScreen() {
  const users = useUsersWithDebts();

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>
          Open a person to audit active and settled ledger entries.
        </Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No debt history yet. Add a debt to get started.
            </Text>
          }
          renderItem={({ item }) => <HistoryUserRow user={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  list: { paddingBottom: 120, flexGrow: 1 },
  empty: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 40,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  name: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  meta: { marginTop: 2, fontSize: 13, color: "#64748B" },
});
