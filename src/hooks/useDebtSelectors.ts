import { useDebtStore } from "@/store/useDebtStore";
import type { DebtEntry, User } from "@/types/debt";

export function useUsers(): User[] {
  return useDebtStore((s) => s.users);
}

export function useOutstandingTotal(userId: string | null): number {
  return useDebtStore((s) =>
    userId
      ? s.debts
          .filter((d) => d.userId === userId && d.status !== "PAID")
          .reduce((sum, d) => sum + d.remainingAmount, 0)
      : 0,
  );
}

export function useUserOutstandingMap(): Record<string, number> {
  return useDebtStore((s) => {
    const map: Record<string, number> = {};
    for (const debt of s.debts) {
      if (debt.status === "PAID") continue;
      map[debt.userId] = (map[debt.userId] ?? 0) + debt.remainingAmount;
    }
    return map;
  });
}

export function useUsersWithDebts(): User[] {
  return useDebtStore((s) => {
    const userIds = new Set(s.debts.map((d) => d.userId));
    return s.users.filter((u) => userIds.has(u.id));
  });
}

export function useDebtsByUser(userId: string | null): DebtEntry[] {
  return useDebtStore((s) =>
    userId
      ? s.debts
          .filter((d) => d.userId === userId)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
      : [],
  );
}

export function usePortfolioTotals() {
  return useDebtStore((s) => {
    const outstanding = s.debts
      .filter((d) => d.status !== "PAID")
      .reduce((sum, d) => sum + d.remainingAmount, 0);
    const settled = s.debts
      .filter((d) => d.status === "PAID")
      .reduce((sum, d) => sum + d.amount, 0);
    const activeCount = s.debts.filter((d) => d.status !== "PAID").length;
    return {
      outstanding,
      settled,
      activeCount,
      userCount: s.users.length,
    };
  });
}
