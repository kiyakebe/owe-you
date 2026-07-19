import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  const handleGetStarted = () => {
    completeOnboarding();
    // The layout effect will handle the redirect, but we can also do it explicitly
    router.replace("/(app)/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>New Way to Habit</Text>
          </View>
          <Text style={styles.headerTitle}>Build Habits{"\n"}Your Way</Text>
          <Text style={styles.headerSubtitle}>
            No schedules. No pressure. Just your habits, ready whenever you are.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <FeatureCard
            icon="infinite-outline"
            title="Flexible Tracking"
            description="Complete habits anytime, anywhere."
          />
          <FeatureCard
            icon="layers-outline"
            title="Organized Space"
            description="All your habits in one simple view."
          />
          <FeatureCard
            icon="stats-chart-outline"
            title="Progress at a Glance"
            description="See streaks and achievements without clutter."
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <View style={styles.buttonIcon}>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  badge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 48,
    letterSpacing: -1,
  },
  headerSubtitle: {
    marginTop: 16,
    fontSize: 18,
    color: "#64748B",
    lineHeight: 28,
  },
  featuresContainer: {
    flex: 1,
    gap: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#00000010",
    justifyContent: "center",
    alignItems: "center",
  },
  featureTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 32,
  },
  button: {
    backgroundColor: "#000000",
    height: 64,
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginLeft: 40,
  },
  buttonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
