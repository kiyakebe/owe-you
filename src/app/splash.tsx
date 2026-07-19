import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
          router.replace("/(app)/(tabs)");
        }
      }
    }

    prepare();
  }, [authHydrated, debtHydrated, hasCompletedOnboarding, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Owe Me</Text>
        <Text style={styles.subtitle}>Track who owes you — and get paid</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
    borderRadius: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    marginTop: 8,
    textAlign: "center",
  },
});
