import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import HomeHabitList from "@/components/home/ListHabits";
import SectionHeader from "@/components/SectionHeader";
import HorizontalFeatures from "@/components/home/HomeFeatures";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Welcome Back!</Text>
            <Text style={styles.bannerSubtitle}>
              You have 5 habits to complete today. Keep up the great momentum!
            </Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>View Habits</Text>
            </TouchableOpacity>
          </View>
        </View>
        <HorizontalFeatures />
        <SectionHeader title="Habits" link="/habits" />
        <HomeHabitList />

        {/* Insight Decorator */}
        <View style={styles.proTipContainer}>
          <Text style={styles.proTipLabel}>Pro Tip</Text>
          <Text style={styles.proTipText}>
            Consistency is key. Small steps every day lead to big changes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 120 },

  bannerContainer: { paddingHorizontal: 14, paddingTop: 16 },
  banner: {
    backgroundColor: "#000000",
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 20,
    marginBottom: 20,
  },
  bannerButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
  },

  actionContainer: { paddingHorizontal: 14, marginTop: 40 },
  addButton: {
    height: 56,
    borderRadius: 20,
    backgroundColor: "#000000",
    borderColor: "#000000",
  },

  ctaTextContainer: { marginTop: 24, paddingHorizontal: 40 },
  ctaText: { color: "#94A3B8" },

  proTipContainer: {
    marginTop: 32,
    marginHorizontal: 14,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#020617",
    overflow: "hidden",
  },
  proTipLabel: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 4,
  },
  proTipText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 24,
  },
});
