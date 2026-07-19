import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDebtStore } from "@/store/useDebtStore";
import { useUserOutstandingMap, useUsers } from "@/hooks/useDebtSelectors";
import { formatCurrency } from "@/utils/format";

export default function UsersScreen() {
  const [name, setName] = useState("");
  const users = useUsers();
  const outstandingMap = useUserOutstandingMap();
  const addUser = useDebtStore((s) => s.addUser);

  const handleAdd = () => {
    const user = addUser(name);
    if (!user) {
      Alert.alert("Invalid name", "Please enter a user name.");
      return;
    }
    setName("");
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <Text style={styles.subtitle}>
              People who owe you money. Totals show what is still outstanding.
            </Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
                returnKeyType="done"
                onSubmitEditing={handleAdd}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleAdd}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Add User</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              ListEmptyComponent={
                <Text style={styles.empty}>No users yet. Add someone above.</Text>
              }
              renderItem={({ item }) => {
                const owed = outstandingMap[item.id] ?? 0;
                return (
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {item.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <Text style={[styles.amount, owed > 0 && styles.amountOwed]}>
                      {formatCurrency(owed)}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8FAFC" },
  flex: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  form: { gap: 10, marginBottom: 16 },
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
  button: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
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
  name: { fontSize: 16, fontWeight: "600", color: "#0F172A", flexShrink: 1 },
  amount: { fontSize: 15, fontWeight: "600", color: "#64748B" },
  amountOwed: { color: "#B45309" },
});
