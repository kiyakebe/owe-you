import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;

  // hydration
  isHydrated: boolean;
  setHydrated: () => void;

  // actions
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  hasCompletedOnboarding: false,

  // hydration
  isHydrated: false,
  setHydrated: () => set({ isHydrated: true }),

  // actions
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  reset: () =>
    set({
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      isHydrated: true, // keep hydrated after reset
    }),
}));
