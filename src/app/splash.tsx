import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";
import { useDebtStore } from "../store/useDebtStore";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const hasCompletedOnboarding = useAuthStore((s) => s.hasCompletedOnboarding);
  const authHydrated = useAuthStore((s) => s.isHydrated);
  const debtHydrated = useDebtStore((s) => s.isHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!authHydrated || !debtHydrated) return;

    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();

        if (!hasCompletedOnboarding) {
          router.replace("/onboarding");
        } else {
          router.replace("/(app)/(tabs)/users");
        }
      }
    }

    prepare();
  }, [authHydrated, debtHydrated, hasCompletedOnboarding, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="wallet-outline" size={80} color="#000000" />
        </View>
        <Text style={styles.title}>Owe Me</Text>
        <Text style={styles.subtitle}>Track who owes you — and get paid</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 24,
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
