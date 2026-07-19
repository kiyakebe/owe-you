import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";

export default function AppLayout() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
