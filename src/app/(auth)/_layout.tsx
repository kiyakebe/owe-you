import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthLayout() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();

  if (isAuthenticated && hasCompletedOnboarding) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
