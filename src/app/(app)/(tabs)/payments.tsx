import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserPicker from "@/components/UserPicker";
import { useDebtStore } from "@/store/useDebtStore";
import { useOutstandingTotal, useUsers } from "@/hooks/useDebtSelectors";
import { formatCurrency } from "@/utils/format";

export default function PaymentsScreen() {
  const users = useUsers();
  const clearAllDebts = useDebtStore((s) => s.clearAllDebts);
  const processPayment = useDebtStore((s) => s.processPayment);

  const [userId, setUserId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const outstanding = useOutstandingTotal(userId);

  const requireUser = () => {
    if (!userId) {
      Alert.alert("Select a user", "Choose whose payment you are recording.");
      return false;
    }
    return true;
  };

  const handleClearAll = () => {
    if (!requireUser() || !userId) return;
    if (outstanding <= 0) {
      Alert.alert("Nothing owed", "This user has no outstanding debt.");
      return;
    }

    Alert.alert(
      "Clear all debt?",
      `This will settle ${formatCurrency(outstanding)} for the selected user.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearAllDebts(userId);
            setCustomAmount("");
            Alert.alert("Settled", "All outstanding debts were cleared.");
          },
        },
      ],
    );
  };

  const handleCustomPayment = () => {
    if (!requireUser() || !userId) return;
    if (outstanding <= 0) {
      Alert.alert("Nothing owed", "This user has no outstanding debt.");
      return;
    }

    const parsed = Number(customAmount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      Alert.alert("Invalid amount", "Enter a positive payment amount.");
      return;
    }

    processPayment(userId, parsed);
    setCustomAmount("");
    Keyboard.dismiss();
    Alert.alert(
      "Payment recorded",
      `${formatCurrency(parsed)} applied using oldest-first matching.`,
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Payment Desk</Text>
            <Text style={styles.subtitle}>
              Clear everything at once, or apply a custom amount oldest-first.
            </Text>

            <Text style={styles.label}>User</Text>
            <UserPicker
              users={users}
              selectedUserId={userId}
              onSelect={setUserId}
            />

            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Currently owed</Text>
              <Text style={styles.totalValue}>{formatCurrency(outstanding)}</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClearAll}
              activeOpacity={0.85}
            >
              <Text style={styles.clearButtonText}>Clear All Debt</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.label}>Custom payment amount</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
              value={customAmount}
              onChangeText={setCustomAmount}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleCustomPayment}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Submit Payment</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  flex: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 140 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
    marginTop: 8,
  },
  totalCard: {
    marginTop: 20,
    backgroundColor: "#0F172A",
    borderRadius: 14,
    padding: 20,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  totalValue: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  clearButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  clearButtonText: { color: "#DC2626", fontSize: 16, fontWeight: "700" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 10,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E2E8F0" },
  dividerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0F172A",
  },
});
