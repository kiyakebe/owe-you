import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SETTINGS, STATUS } from "@/contstants/profile";
import {
  // SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const inset = useSafeAreaInsets();
  const { reset } = useAuthStore();
  const router = useRouter();

  const handleResetApp = () => {
    reset();
    router.replace("/onboarding");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color="#64748B" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>kIYa kebe</Text>
          <Text style={styles.userEmail}>Kiya@owe-me.com</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {STATUS.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon as any} size={20} color="#0F172A" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {SETTINGS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.settingItem}>
              <View
                style={[
                  styles.settingIconBox,
                  { backgroundColor: item.color + "15" },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger Zone */}
        <View style={[styles.dangerZone, { paddingBottom: inset.bottom + 40 }]}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleResetApp}
          >
            <Ionicons name="refresh-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Reset App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 40,
    backgroundColor: "#F8FAFC",
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000000",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#64748B",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statIconContainer: {
    marginBottom: 8,
    opacity: 0.6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  settingsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
  },
  dangerZone: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
});
