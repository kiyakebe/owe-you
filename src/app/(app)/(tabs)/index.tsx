import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  usePortfolioTotals,
  useUserOutstandingMap,
  useUsers,
} from "@/hooks/useDebtSelectors";
import { formatCurrency } from "@/utils/format";

export default function HomeScreen() {
  const router = useRouter();
  const users = useUsers();
  const outstandingMap = useUserOutstandingMap();
  const { outstanding, settled, activeCount, userCount } = usePortfolioTotals();

  const topDebtors = useMemo(() => {
    return users
      .map((user) => ({
        id: user.id,
        name: user.name,
        amount: outstandingMap[user.id] ?? 0,
      }))
      .filter((item) => item.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [users, outstandingMap]);

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          A quick look at what people still owe you.
        </Text>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Total outstanding</Text>
          <Text style={styles.heroValue}>{formatCurrency(outstanding)}</Text>
          <Text style={styles.heroHint}>
            {activeCount} open {activeCount === 1 ? "debt" : "debts"} across{" "}
            {userCount} {userCount === 1 ? "person" : "people"}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Settled</Text>
            <Text style={styles.statValue}>{formatCurrency(settled)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>People</Text>
            <Text style={styles.statValue}>{userCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Open</Text>
            <Text style={styles.statValue}>{activeCount}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.actions}>
          <ActionButton
            icon="person-add-outline"
            label="Add user"
            onPress={() => router.push("/(app)/(tabs)/users")}
          />
          <ActionButton
            icon="document-text-outline"
            label="Add debt"
            onPress={() => router.push("/(app)/(tabs)/debt-management")}
          />
          <ActionButton
            icon="card-outline"
            label="Record pay"
            onPress={() => router.push("/(app)/(tabs)/payments")}
          />
        </View>

        <Text style={styles.sectionTitle}>Top outstanding</Text>
        {topDebtors.length === 0 ? (
          <Text style={styles.empty}>
            Nobody owes you yet. Add a user and log a debt to get started.
          </Text>
        ) : (
          topDebtors.map((item) => (
            <View key={item.id} style={styles.debtorRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.debtorName}>{item.name}</Text>
              <Text style={styles.debtorAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={18} color="#0F172A" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 140 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  hero: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.65)",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  heroValue: {
    marginTop: 8,
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  heroHint: {
    marginTop: 8,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 18,
  },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 12,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  statValue: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  actions: { flexDirection: "row", gap: 10, marginBottom: 24 },
  action: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingVertical: 14,
    alignItems: "center",
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
  empty: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
  },
  debtorRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  debtorName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  debtorAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#B45309",
  },
});
