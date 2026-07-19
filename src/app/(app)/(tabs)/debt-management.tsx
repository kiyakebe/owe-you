import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import UserPicker from "@/components/UserPicker";
import { useDebtStore } from "@/store/useDebtStore";
import { useUsers } from "@/hooks/useDebtSelectors";
import { formatDate } from "@/utils/format";

export default function DebtManagementScreen() {
  const users = useUsers();
  const addDebt = useDebtStore((s) => s.addDebt);

  const [userId, setUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [useCalendar, setUseCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmit = () => {
    if (!userId) {
      Alert.alert("Select a user", "Choose who this debt belongs to.");
      return;
    }

    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      Alert.alert("Invalid amount", "Enter a positive number.");
      return;
    }

    if (!reason.trim()) {
      Alert.alert("Reason required", "Add a short reason for this debt.");
      return;
    }

    const dateIso = useCalendar
      ? selectedDate.toISOString()
      : new Date().toISOString();

    const debt = addDebt(userId, parsed, reason, dateIso);
    if (!debt) {
      Alert.alert("Could not add debt", "Please check your inputs and try again.");
      return;
    }

    setAmount("");
    setReason("");
    setUseCalendar(false);
    setSelectedDate(new Date());
    Keyboard.dismiss();
    Alert.alert("Debt added", "Ledger entry saved successfully.");
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
            <Text style={styles.title}>Debt Intake</Text>
            <Text style={styles.subtitle}>
              Record a new amount someone owes you.
            </Text>

            <Text style={styles.label}>User</Text>
            <UserPicker
              users={users}
              selectedUserId={userId}
              onSelect={setUserId}
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#94A3B8"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Reason</Text>
            <TextInput
              style={[styles.input, styles.reasonInput]}
              placeholder="What was this for?"
              placeholderTextColor="#94A3B8"
              value={reason}
              onChangeText={setReason}
              multiline
            />

            <View style={styles.toggleRow}>
              <View style={styles.toggleCopy}>
                <Text style={styles.toggleTitle}>Select from calendar</Text>
                <Text style={styles.toggleHint}>
                  {useCalendar
                    ? `Using ${formatDate(selectedDate.toISOString())}`
                    : "Automatic (current time)"}
                </Text>
              </View>
              <Switch
                value={useCalendar}
                onValueChange={(value) => {
                  setUseCalendar(value);
                  if (value && Platform.OS === "android") {
                    setShowPicker(true);
                  }
                }}
                trackColor={{ false: "#CBD5E1", true: "#94A3B8" }}
                thumbColor={useCalendar ? "#0F172A" : "#F8FAFC"}
              />
            </View>

            {useCalendar && (
              <View style={styles.dateBlock}>
                {Platform.OS === "android" && (
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowPicker(true)}
                  >
                    <Text style={styles.dateButtonText}>
                      {formatDate(selectedDate.toISOString())}
                    </Text>
                  </TouchableOpacity>
                )}
                {(Platform.OS === "ios" || showPicker) && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDateChange}
                  />
                )}
              </View>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Add Debt Ledger</Text>
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
    marginTop: 14,
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
  reasonInput: { minHeight: 88, textAlignVertical: "top" },
  toggleRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  toggleCopy: { flex: 1, marginRight: 12 },
  toggleTitle: { fontSize: 15, fontWeight: "600", color: "#0F172A" },
  toggleHint: { marginTop: 2, fontSize: 13, color: "#64748B" },
  dateBlock: { marginTop: 12 },
  dateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  dateButtonText: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  button: {
    marginTop: 28,
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
