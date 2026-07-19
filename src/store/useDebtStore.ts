import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { DebtEntry, Payment, User } from "@/types/debt";
import { generateId } from "@/utils/uuid";

interface DebtState {
  users: User[];
  debts: DebtEntry[];
  isHydrated: boolean;
  setHydrated: () => void;

  addUser: (name: string) => User | null;
  addDebt: (
    userId: string,
    amount: number,
    reason: string,
    date: string,
  ) => DebtEntry | null;
  /** Case A: settle every outstanding debt for a user. */
  clearAllDebts: (userId: string) => void;
  /** Case B: apply a partial/custom payment using FIFO (oldest first). */
  processPayment: (userId: string, totalPaymentAmount: number) => void;

  getUserById: (userId: string) => User | undefined;
  getDebtsByUser: (userId: string) => DebtEntry[];
  getOutstandingTotal: (userId: string) => number;
  getUsersWithDebts: () => User[];
}

function createPayment(amountPaid: number, date = new Date().toISOString()): Payment {
  return {
    id: generateId(),
    amountPaid,
    date,
  };
}

export const useDebtStore = create<DebtState>()(
  persist(
    (set, get) => ({
      users: [],
      debts: [],
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),

      addUser: (name) => {
        const trimmed = name.trim();
        if (!trimmed) return null;

        const user: User = {
          id: generateId(),
          name: trimmed,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ users: [...state.users, user] }));
        return user;
      },

      addDebt: (userId, amount, reason, date) => {
        const user = get().users.find((u) => u.id === userId);
        if (!user || !(amount > 0) || !reason.trim()) return null;

        const debt: DebtEntry = {
          id: generateId(),
          userId,
          amount,
          remainingAmount: amount,
          reason: reason.trim(),
          date,
          status: "UNPAID",
          payments: [],
        };

        set((state) => ({ debts: [...state.debts, debt] }));
        return debt;
      },

      clearAllDebts: (userId) => {
        const paymentDate = new Date().toISOString();

        set((state) => ({
          debts: state.debts.map((debt) => {
            if (debt.userId !== userId || debt.status === "PAID") {
              return debt;
            }

            const amountCleared = debt.remainingAmount;
            if (amountCleared <= 0) {
              return {
                ...debt,
                remainingAmount: 0,
                status: "PAID" as const,
              };
            }

            return {
              ...debt,
              remainingAmount: 0,
              status: "PAID" as const,
              payments: [
                ...debt.payments,
                createPayment(amountCleared, paymentDate),
              ],
            };
          }),
        }));
      },

      processPayment: (userId, totalPaymentAmount) => {
        if (!(totalPaymentAmount > 0)) return;

        const paymentDate = new Date().toISOString();
        let remainingPayment = totalPaymentAmount;

        set((state) => {
          const openDebts = state.debts
            .filter((d) => d.userId === userId && d.status !== "PAID")
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );

          const updates = new Map<string, DebtEntry>();

          for (const debt of openDebts) {
            if (remainingPayment <= 0) break;

            const applied = Math.min(debt.remainingAmount, remainingPayment);
            const nextRemaining = debt.remainingAmount - applied;
            const nextStatus = nextRemaining <= 0 ? "PAID" : "PARTIAL";

            updates.set(debt.id, {
              ...debt,
              remainingAmount: Math.max(0, nextRemaining),
              status: nextStatus,
              payments: [...debt.payments, createPayment(applied, paymentDate)],
            });

            remainingPayment -= applied;
          }

          if (updates.size === 0) return state;

          return {
            debts: state.debts.map((debt) => updates.get(debt.id) ?? debt),
          };
        });
      },

      getUserById: (userId) => get().users.find((u) => u.id === userId),

      getDebtsByUser: (userId) =>
        get()
          .debts.filter((d) => d.userId === userId)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ),

      getOutstandingTotal: (userId) =>
        get()
          .debts.filter((d) => d.userId === userId && d.status !== "PAID")
          .reduce((sum, d) => sum + d.remainingAmount, 0),

      getUsersWithDebts: () => {
        const { users, debts } = get();
        const userIds = new Set(debts.map((d) => d.userId));
        return users.filter((u) => userIds.has(u.id));
      },
    }),
    {
      name: "owe-me-debt-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        users: state.users,
        debts: state.debts,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
