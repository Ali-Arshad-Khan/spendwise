import { useMemo , useContext } from "react";
import { DashboardContext } from "../components/DashboardProvider";

export function useTransactions() {
  const { transactions, fetchTransactions } = useContext(DashboardContext);

  const grouped = useMemo(() => groupByDate(transactions), [transactions]);
  const groupedExpense = useMemo(() => groupByDate(transactions.filter(t => t.type === "expense")), [transactions]);
  const groupedIncome = useMemo(() => groupByDate(transactions.filter(t => t.type === "income")), [transactions]);

  const totalExpenseCount = transactions.filter(t => t.type === "expense").length;
  const totalIncomeCount = transactions.filter(t => t.type === "income").length;

  return {
    transactions,
    grouped,
    groupedExpense,
    groupedIncome,
    totalExpenseCount,
    totalIncomeCount,
    fetchTransactions
  };
}

// Helper
function groupByDate(list) {
  return list.reduce((acc, t) => {
    const date = t.date.slice(0,10);
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {});
}
