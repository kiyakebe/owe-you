import { create } from "zustand";

interface AuthState {
  hasCompletedOnboarding: boolean;

  // hydration
  isHydrated: boolean;
  setHydrated: () => void;

  // actions
  completeOnboarding: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasCompletedOnboarding: false,

  // hydration
  isHydrated: false,
  setHydrated: () => set({ isHydrated: true }),

  // actions
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  reset: () =>
    set({
      hasCompletedOnboarding: false,
      isHydrated: true, // keep hydrated after reset
    }),
}));
