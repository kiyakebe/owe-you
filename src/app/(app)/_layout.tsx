import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";

export default function AppLayout() {
  const { hasCompletedOnboarding } = useAuthStore();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
