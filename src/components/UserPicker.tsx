import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { User } from "@/types/debt";

type Props = {
  users: User[];
  selectedUserId: string | null;
  onSelect: (userId: string) => void;
  placeholder?: string;
};

export default function UserPicker({
  users,
  selectedUserId,
  onSelect,
  placeholder = "Select a user",
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = users.find((u) => u.id === selectedUserId);

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.triggerText, !selected && styles.placeholder]}
          numberOfLines={1}
        >
          {selected?.name ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#64748B" />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Choose user</Text>
            {users.length === 0 ? (
              <Text style={styles.empty}>No users yet. Add one first.</Text>
            ) : (
              <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isSelected = item.id === selectedUserId;
                  return (
                    <TouchableOpacity
                      style={[styles.option, isSelected && styles.optionSelected]}
                      onPress={() => {
                        onSelect(item.id);
                        setOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {item.name}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color="#0F172A" />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    marginRight: 8,
  },
  placeholder: {
    color: "#94A3B8",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    maxHeight: "60%",
    paddingVertical: 12,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  empty: {
    padding: 16,
    color: "#64748B",
    fontSize: 14,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: "#F1F5F9",
  },
  optionText: {
    fontSize: 16,
    color: "#334155",
  },
  optionTextSelected: {
    fontWeight: "700",
    color: "#0F172A",
  },
});
