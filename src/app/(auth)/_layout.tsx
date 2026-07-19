import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";

export default function AuthLayout() {
  const { hasCompletedOnboarding } = useAuthStore();

  if (hasCompletedOnboarding) {
    return <Redirect href="/(app)/(tabs)/users" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
