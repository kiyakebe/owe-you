import { useMemo } from "react";

import { useDebtStore } from "@/store/useDebtStore";
import type { DebtEntry, User } from "@/types/debt";

const EMPTY_DEBTS: DebtEntry[] = [];
const EMPTY_USERS: User[] = [];

export function useUsers(): User[] {
  return useDebtStore((s) => s.users);
}

export function useOutstandingTotal(userId: string | null): number {
  const debts = useDebtStore((s) => s.debts);

  return useMemo(() => {
    if (!userId) return 0;
    return debts
      .filter((d) => d.userId === userId && d.status !== "PAID")
      .reduce((sum, d) => sum + d.remainingAmount, 0);
  }, [debts, userId]);
}

export function useUserOutstandingMap(): Record<string, number> {
  const debts = useDebtStore((s) => s.debts);

  return useMemo(() => {
    const map: Record<string, number> = {};
    for (const debt of debts) {
      if (debt.status === "PAID") continue;
      map[debt.userId] = (map[debt.userId] ?? 0) + debt.remainingAmount;
    }
    return map;
  }, [debts]);
}

export function useUsersWithDebts(): User[] {
  const users = useDebtStore((s) => s.users);
  const debts = useDebtStore((s) => s.debts);

  return useMemo(() => {
    if (debts.length === 0) return EMPTY_USERS;
    const userIds = new Set(debts.map((d) => d.userId));
    return users.filter((u) => userIds.has(u.id));
  }, [users, debts]);
}

export function useDebtsByUser(userId: string | null): DebtEntry[] {
  const debts = useDebtStore((s) => s.debts);

  return useMemo(() => {
    if (!userId) return EMPTY_DEBTS;
    return debts
      .filter((d) => d.userId === userId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [debts, userId]);
}

export function usePortfolioTotals() {
  const users = useDebtStore((s) => s.users);
  const debts = useDebtStore((s) => s.debts);

  return useMemo(() => {
    const outstanding = debts
      .filter((d) => d.status !== "PAID")
      .reduce((sum, d) => sum + d.remainingAmount, 0);
    const settled = debts
      .filter((d) => d.status === "PAID")
      .reduce((sum, d) => sum + d.amount, 0);
    const activeCount = debts.filter((d) => d.status !== "PAID").length;
    return {
      outstanding,
      settled,
      activeCount,
      userCount: users.length,
    };
  }, [users, debts]);
}
