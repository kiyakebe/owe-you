export type DebtStatus = "UNPAID" | "PARTIAL" | "PAID";

export interface Payment {
  id: string;
  amountPaid: number;
  date: string;
}

export interface User {
  id: string;
  name: string;
  createdAt: string;
}

export interface DebtEntry {
  id: string;
  userId: string;
  amount: number;
  remainingAmount: number;
  reason: string;
  date: string;
  status: DebtStatus;
  payments: Payment[];
}
