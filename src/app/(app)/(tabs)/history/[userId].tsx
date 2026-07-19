import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useDebtStore } from "@/store/useDebtStore";
import { useDebtsByUser } from "@/hooks/useDebtSelectors";
import { formatCurrency, formatDate, formatDateTime } from "@/utils/format";
import type { DebtEntry } from "@/types/debt";

function DebtCard({ debt, settled }: { debt: DebtEntry; settled?: boolean }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.reason}>{debt.reason}</Text>
        <View
          style={[
            styles.badge,
            debt.status === "PAID" && styles.badgePaid,
            debt.status === "PARTIAL" && styles.badgePartial,
            debt.status === "UNPAID" && styles.badgeUnpaid,
          ]}
        >
          <Text style={styles.badgeText}>{debt.status}</Text>
        </View>
      </View>

      <Text style={styles.date}>{formatDate(debt.date)}</Text>

      <View style={styles.amounts}>
        <View>
          <Text style={styles.amountLabel}>Original</Text>
          <Text style={styles.amountValue}>{formatCurrency(debt.amount)}</Text>
        </View>
        {!settled && (
          <View>
            <Text style={styles.amountLabel}>Remaining</Text>
            <Text style={[styles.amountValue, styles.remaining]}>
              {formatCurrency(debt.remainingAmount)}
            </Text>
          </View>
        )}
      </View>

      {debt.payments.length > 0 && (
        <View style={styles.payments}>
          <Text style={styles.paymentsTitle}>Payment log</Text>
          {[...debt.payments]
            .sort(
              (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime(),
            )
            .map((payment) => (
              <View key={payment.id} style={styles.paymentRow}>
                <Text style={styles.paymentDate}>
                  {formatDateTime(payment.date)}
                </Text>
                <Text style={styles.paymentAmount}>
                  {formatCurrency(payment.amountPaid)}
                </Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
}

export default function HistoryDetailScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const user = useDebtStore((s) => s.users.find((u) => u.id === userId));
  const debts = useDebtsByUser(userId ?? null);

  const { active, settled } = useMemo(() => {
    const activeLedger = debts.filter((d) => d.status !== "PAID");
    const settledLedger = debts.filter((d) => d.status === "PAID");
    return { active: activeLedger, settled: settledLedger };
  }, [debts]);

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{user?.name ?? "Debt history"}</Text>
          <Text style={styles.subtitle}>Active and settled ledger</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Active ledger</Text>
        {active.length === 0 ? (
          <Text style={styles.empty}>No open debts.</Text>
        ) : (
          active.map((debt) => <DebtCard key={debt.id} debt={debt} />)
        )}

        <Text style={[styles.sectionTitle, styles.sectionSpaced]}>
          Settled ledger
        </Text>
        {settled.length === 0 ? (
          <Text style={styles.empty}>No settled debts yet.</Text>
        ) : (
          settled.map((debt) => (
            <DebtCard key={debt.id} debt={debt} settled />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  headerCopy: { flex: 1 },
  title: { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 2, fontSize: 13, color: "#64748B" },
  content: { paddingHorizontal: 16, paddingBottom: 140 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  sectionSpaced: { marginTop: 24 },
  empty: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  reason: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgePaid: { backgroundColor: "#DCFCE7" },
  badgePartial: { backgroundColor: "#FEF3C7" },
  badgeUnpaid: { backgroundColor: "#FEE2E2" },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: 0.4,
  },
  date: { marginTop: 6, fontSize: 13, color: "#64748B" },
  amounts: {
    flexDirection: "row",
    gap: 24,
    marginTop: 14,
  },
  amountLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  amountValue: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  remaining: { color: "#B45309" },
  payments: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },
  paymentsTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 8,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  paymentDate: { fontSize: 13, color: "#64748B" },
  paymentAmount: { fontSize: 13, fontWeight: "600", color: "#0F172A" },
});
