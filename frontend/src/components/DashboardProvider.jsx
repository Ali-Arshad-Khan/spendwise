import { createContext, useState } from "react";
import dashboardImg from "../assets/images/tohoe.jpeg";
import api from "../../api";
import { toast } from "react-hot-toast"; // if you are using react-hot-toast

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [flag, setFlag] = useState(false); // boolean state
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [currentId, setCurrentId] = useState("");

  function deleteButton(cur) {
    setCurrentId(cur);
    setConfirmDelete(!confirmDelete);
  }

  function yesButton(curId) {
    handleDeleteTransaction(curId);
    setCurrentId(""); // <-- clear ID
    setConfirmDelete(!confirmDelete);
  }

  // ✅ Fetch all transactions (used on mount + after adding new)
  const fetchTransactions = async () => {
    try {
      const res = await api.get("/api/transactions");
      const data = res.data || [];

      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      const totalIncome = sortedData
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);

      const totalExpense = sortedData
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

      const totalBalance = totalIncome - totalExpense;

      setTransactions(sortedData);
      setTotals({
        income: totalIncome,
        expense: totalExpense,
        balance: totalBalance,
      });
    } catch (err) {
      console.error("❌ Error fetching transactions:", err);
      toast.error("Error fetching transactions");
    }
  };

  // ✅ Delete a transaction (can be used anywhere)
  const handleDeleteTransaction = async (id) => {
    setError("");
    setLoadingState(true);
    try {
      await api.delete(`/api/transactions/${id}`);
      toast.success("Transaction deleted successfully!", { duration: 4000 });
      await fetchTransactions(); // refresh all transactions
    } catch (err) {
      console.error("❌ Delete failed:", err);
      const msg = err.response?.data?.message || "Error deleting transaction";
      setError(msg);
      toast.error(msg, { duration: 6000 });
    } finally {
      setLoadingState(false);
    }
  };

  const pp = {
    backgroundImage: flag ? `url(${dashboardImg})` : "",
  };

  return (
    <DashboardContext.Provider
      value={{
        flag,
        setFlag,
        pp,
        transactions,
        totals,
        fetchTransactions,
        loadingState,
        error,
        handleDeleteTransaction, // <-- exposed for any page
        confirmDelete,
        setConfirmDelete,
        currentId,
        setCurrentId,
        deleteButton,
        yesButton,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
