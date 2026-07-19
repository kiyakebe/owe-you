// import { useEffect } from "react";
// import { Stack, useRouter, useSegments } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { useAuthStore } from "../store/useAuthStore";

// export default function RootLayout() {
//   const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     const inAuthGroup = segments[0] === "(tabs)";
//     const inOnboarding = segments[0] === "onboarding";
//     const inLogin = segments[0] === "login";

//     if (!hasCompletedOnboarding && !inOnboarding) {
//       // Redirect to onboarding if not completed
//       router.replace("/onboarding");
//     } else if (hasCompletedOnboarding && !isAuthenticated && inAuthGroup) {
//       // Redirect to login if not authenticated and trying to access protected routes
//       router.replace("/login");
//     } else if (isAuthenticated && (inLogin || inOnboarding)) {
//       // Redirect to home if authenticated but trying to access login/onboarding
//       router.replace("/(tabs)");
//     }
//   }, [isAuthenticated, hasCompletedOnboarding, segments]);

//   return (
//     <>
//       <StatusBar style="dark" />
//       <Stack
//         screenOptions={{
//           headerShown: false,
//           headerStyle: {
//             backgroundColor: "#fff",
//           },
//           contentStyle: {
//             backgroundColor: "#ffffff",
//           },
//           headerShadowVisible: false,
//           gestureEnabled: true,
//         }}
//       >
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//         <Stack.Screen name="login" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       </Stack>
//     </>
//   );
// }

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}
