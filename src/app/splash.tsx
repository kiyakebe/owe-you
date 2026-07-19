import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const { hasCompletedOnboarding } = useAuthStore();
  const router = useRouter();

  console.log(
    JSON.stringify(
      {
        hasCompletedOnboarding,
      },
      null,
      2,
    ),
  );

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();

        // Routing decisions
        if (!hasCompletedOnboarding) {
          router.replace("/onboarding");
        } else {
          router.replace("/(app)/(tabs)");
        }
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="checkbox-outline" size={80} color="#000000" />
        </View>
        <Text style={styles.title}>Owe Me</Text>
        <Text style={styles.subtitle}>Your Day, Simplified</Text>
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
  },
});
