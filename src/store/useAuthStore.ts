import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  hasCompletedOnboarding: boolean;
  isHydrated: boolean;
  setHydrated: () => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      reset: () =>
        set({
          hasCompletedOnboarding: false,
          isHydrated: true,
        }),
    }),
    {
      name: "owe-me-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
