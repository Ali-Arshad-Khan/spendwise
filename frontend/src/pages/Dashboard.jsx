import { useAuth } from "../components/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { DashboardContext } from "../components/DashboardProvider";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import closeIcon from "../assets/images/close2.png";
import { useCountUp } from "../hooks/useCountUp";
import { useTransactions } from "../hooks/useTransactions.js";
import TransactionList from "../components/transactions/TrnsactionList.jsx";
import IncomeList from "../components/transactions/IncomeList.jsx";
import ExpenseList from "../components/transactions/ExpenseList.jsx";

export default function Dashboard() {
  const todaysFormattedDate = dayjs().format("YYYY-MM-DD");

  // const { loading } = useAuth();

  


  const [displayTransaction, setDisplayTransaction] = useState("hidden");

  const [formData, setFormData] = useState({
    category: "",
    type: "",
    amount: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const {
    flag,
    setFlag,
    transactions,
    totals,
    fetchTransactions,
    confirmDelete,
    setConfirmDelete,
    currentId,
    setCurrentId,
    deleteButton,
    yesButton,
  } = useContext(DashboardContext);

  const [showTrans, setShowTrans] = useState("all");

  const [download, setDownload] = useState(false);

  function exportButton() {
    setDownload(!download);
  }

  const { pp } = useContext(DashboardContext);

  function togglePP() {
    setFlag((prev) => !prev);
  }

  const {
    grouped,
    groupedIncome,
    groupedExpense,
    totalExpenseCount,
    totalIncomeCount,
  } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);

  function toggleTransaction() {
    setDisplayTransaction((prev) => (prev === "hidden" ? "block" : "hidden"));
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingState(true);

    try {
      await api.post("/api/transactions/add", formData);
      console.log(formData); // submit or send to API
      toast.success("Transaction added successfully!", {
        duration: 4000,
      });
      // ✅ Clear the form after submit
      setFormData({
        category: "",
        type: "",
        description: "",
        amount: "",
      });
      toggleTransaction();

      await fetchTransactions();
    } catch (err) {
      console.error("❌ Login failed:", err);
      const msg = err.response?.data?.message || "Error Adding Transaction";
      setError(msg);
      toast.error(msg, {
        duration: 6000,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // ============================
  // 📥 DOWNLOAD EXCEL
  // ============================
  const downloadExcel = () => {
    let dataToExport = [];

    if (showTrans === "all") dataToExport = transactions;
    else if (showTrans === "expense")
      dataToExport = transactions.filter((t) => t.type === "expense");
    else dataToExport = transactions.filter((t) => t.type === "income");

    const sheetData = dataToExport.map((t) => ({
      Category: t.category,
      Type: t.type,
      Description: t.description,
      Date: new Date(t.date).toISOString().slice(0, 10),
      Amount: t.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  // ============================
  // 📄 DOWNLOAD PDF
  // ============================
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions Report", 14, 10);

    let dataToExport = [];

    if (showTrans === "all") dataToExport = transactions;
    else if (showTrans === "expense")
      dataToExport = transactions.filter((t) => t.type === "expense");
    else dataToExport = transactions.filter((t) => t.type === "income");

    const tableColumn = ["Category", "Type", "Description", "Date", "Amount"];
    const tableRows = [];

    dataToExport.forEach((t) => {
      tableRows.push([
        t.category,
        t.type,
        t.description,
        new Date(t.date).toISOString().slice(0, 10),
        `₹ ${t.amount.toLocaleString("en-IN")}`,
      ]);
    });

    // ✅ FIX (must pass doc)
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("transactions.pdf");
  };

  const [atTop, setAtTop] = useState(true);
  const SCROLL_THRESHOLD = 100; // show after 50px scroll

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setAtTop(false); // hide nav after 50px scroll
      } else {
        setAtTop(true); // show nav when within 50px from top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animatedExpense = useCountUp(totals.expense, 600);
  const animatedIncome = useCountUp(totals.income, 600);
  const animatedBalance = useCountUp(totals.balance, 600);

  return (
    <div
      className="h-full flex w-full bg-cover bg-center bg-no-repeat bg-mainbg"
      style={pp}
    >
      <div className="main h-full w-full lg:ml-[280px] flex-1 py-[30px] px-[20px] md:px-[20px] lg:px-[30px] text-white">
        <div className="dashboard-title mb-[20px] flex justify-between items-center gap-5">
          <div className="flex justify-center items-center gap-5">
            <h1 className="text-[clamp(16px,2.5vw,32px)] font-bold mb-2">
              Account Dashboard
            </h1>
            <button
              onClick={togglePP}
              className={` cursor-pointer
              w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300
              backdrop-blur-md border border-white/20 
              ${flag ? "bg-white/10" : "bg-white/40"}
            `}
            >
              <span
                className={`
                w-4 h-4 rounded-full shadow-lg transform transition-all duration-300
                ${
                  flag
                    ? "translate-x-6 bg-purple-500 shadow-purple-500/60"
                    : "translate-x-0 bg-blue-300 shadow-blue-400/60"
                }
              `}
              ></span>
            </button>
          </div>
        </div>

        <div className="card-container items-center hidden sm:grid grid-cols-3 gap-5 text-white ">
          <div className="expense-card flex flex-col gap-[40px] items-start max-w-full ">
            <div
              className={`card-top w-full py-[12px] px-[20px] text-white rounded-[8px] border-r-[10px]  border-solid border-r-expense ${
                flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
              }`}
            >
              <p className="p-0 m-0 text-[clamp(12px,1.2vw,20px)] text-expense">
                Total Expense
              </p>
              <p className="mt-[10px] mb-0 p-0 text-[clamp(16px,2.5vw,54px)]">
                ₹ {animatedExpense.toLocaleString("en-IN")}
              </p>
              <p className="my-[5px] ml-[5px] text-[clamp(10px,0.8vw,14px)]">
                {totalExpenseCount} transactions
              </p>
            </div>
          </div>

          <div className="income-card flex flex-col gap-[40px] items-start max-w-full">
            <div
              className={`card-top w-full py-[12px] px-[20px] text-white rounded-[8px] border-r-[10px] border-solid border-r-budget ${
                flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
              }`}
            >
              <p className="p-0 m-0 text-[clamp(12px,1.2vw,20px)] text-budget">
                Total Income
              </p>
              <p className="mt-[10px] mb-0 p-0 text-[clamp(16px,2.5vw,54px)]">
                {" "}
                ₹ {animatedIncome.toLocaleString("en-IN")}
              </p>
              <p className="my-[5px] ml-[5px] text-[clamp(10px,0.8vw,14px)]">
                {totalIncomeCount} transactions
              </p>
            </div>
          </div>

          <div className="balance-card flex flex-col gap-[50px] items-start max-w-full">
            <div
              className={`card-top w-full py-[12px] px-[20px] text-white rounded-[8px] border-r-[10px] border-solid border-r-balance ${
                flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
              }`}
            >
              <p className="p-0 m-0 text-[clamp(12px,1.2vw,20px)] text-balance">
                Total Balance
              </p>
              <p className="mt-[10px] mb-0 p-0 text-[clamp(16px,2.5vw,54px)]">
                {" "}
                ₹ {animatedBalance.toLocaleString("en-IN")}
              </p>
              <p className="my-[5px] ml-[5px] text-[clamp(10px,0.8vw,14px)]">
                Latest: {todaysFormattedDate}
              </p>
            </div>
          </div>
        </div>
        <div className="card-container-mobile flex sm:hidden flex-nowrap overflow-x-auto no-scrollbar space-x-4">
          <div
            className={`expense shrink-0 pl-3 pr-10 py-2 rounded-md whitespace-nowrap border-r-[5px] border-solid border-r-expense ${
              flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
            }`}
          >
            <h2 className="text-[14px] text-expense">Total Expense</h2>
            <p className="text-[16px]">
              ₹ {animatedExpense.toLocaleString("en-IN")}
            </p>
            <p className="text-[12px] text-gray-300">
              {totalExpenseCount} transactions
            </p>
          </div>

          <div
            className={`income shrink-0 pl-3 pr-10 py-2 rounded-md whitespace-nowrap border-r-[5px] border-solid border-r-budget ${
              flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
            }`}
          >
            <h2 className="text-[14px] text-budget">Total Income</h2>
            <p className="text-[16px]">
              ₹ {animatedIncome.toLocaleString("en-IN")}
            </p>
            <p className="text-[12px] text-gray-300">
              {totalIncomeCount} transactions
            </p>
          </div>

          <div
            className={`balance shrink-0 pl-3 pr-10 py-2 rounded-md whitespace-nowrap border-r-[5px] border-solid border-r-balance ${
              flag ? "bg-white/4 backdrop-blur-md" : "bg-cardbg"
            }`}
          >
            <h2 className="text-[14px] text-balance">Total Balance</h2>
            <p className="text-[16px]">
              ₹ {animatedBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-[12px] text-gray-300">
              Latest: {todaysFormattedDate}
            </p>
          </div>
        </div>

        <div className="sm:py-6 h-full">
          <div className="min-h-[100vh] h-full">
            <div
              className={`trans-nav z-30 sticky top-[0rem] sm:static py-2 flex flex-col sm:flex-row sm:items-center gap-5 justify-between ${
                flag
                  ? !atTop
                    ? "bg-white/4 backdrop-blur-md rounded-lg"
                    : ""
                  : "bg-dashboardbg"
              }`}
            >
              {!atTop && (
                <div
                  className={`transition-all duration-300 ease-out 
                  animate-squeezeIn text-[12px] flex px-5 py-2 sm:hidden justify-between items-center rounded-lg ${
                    flag
                      ? "bg-white/4 backdrop-blur-md rounded-lg"
                      : "bg-cardbg"
                  }`}
                >
                  <span>
                    <p className="text-expense">Total Expense :</p>
                    <p>₹ {totals.expense.toLocaleString("en-IN")}</p>
                  </span>
                  <span>
                    <p className="text-budget">Total Income :</p>
                    <p>₹ {totals.income.toLocaleString("en-IN")}</p>
                  </span>
                  <span>
                    <p className="text-balance">Total Balance :</p>
                    <p>₹ {totals.balance.toLocaleString("en-IN")}</p>
                  </span>
                </div>
              )}

              <div
                className={`
                flex justify-end gap-2 
                ${atTop ? "block sm:block" : "block sm:block"} 
              `}
              >
                {/* Small screen logic */}
                <div
                  className={`sm:hidden ${
                    atTop ? "block" : "hidden"
                  } flex gap-0 text-[12px]`}
                >
                  <span
                    onClick={() => setShowTrans("all")}
                    className={`cursor-pointer px-4 py-2 rounded-full transition 
        ${
          showTrans === "all"
            ? "text-primary underline underline-offset-4"
            : "text-gray-300 hover:underline hover:underline-offset-4 hover:text-primary"
        }`}
                  >
                    All
                  </span>

                  <span
                    onClick={() => setShowTrans("expense")}
                    className={`cursor-pointer px-4 py-2 rounded-full transition 
        ${
          showTrans === "expense"
            ? "text-primary underline underline-offset-4"
            : "text-gray-300 hover:underline hover:underline-offset-4 hover:text-primary"
        }`}
                  >
                    Expense
                  </span>

                  <span
                    onClick={() => setShowTrans("income")}
                    className={`cursor-pointer px-4 py-2 rounded-full transition 
        ${
          showTrans === "income"
            ? "text-primary underline underline-offset-4"
            : "text-gray-300 hover:underline hover:underline-offset-4 hover:text-primary"
        }`}
                  >
                    Income
                  </span>
                </div>

                {/* Large screens logic: always show */}
                <div className="hidden sm:flex justify-center gap-1 pb-5">
                  <span
                    onClick={() => setShowTrans("all")}
                    className={`cursor-pointer px-4 py-2 rounded-full transition 
        ${
          showTrans === "all"
            ? "text-primary underline underline-offset-4"
            : "text-gray-300 hover:underline hover:underline-offset-4 hover:text-primary"
        }`}
                  >
                    All
                  </span>

                  <span
                    onClick={() => setShowTrans("expense")}
                    className={`cursor-pointer px-4 py-2 rounded-full transition 
        ${
          showTrans === "expense"
            ? "text-primary underline underline-offset-4"
            : "text-gray-300 hover:underline hover:underline-offset-4 hover:text-primary"
        }`}
                  >
                    Expense
                  </span>

                  <span
                    onClick={() => setShowTrans("income")}
                    className={`cursor-pointer px-4 py-2 rounded-full transition 
        ${
          showTrans === "income"
            ? "text-primary underline underline-offset-4"
            : "text-gray-300 hover:underline hover:underline-offset-4 hover:text-primary"
        }`}
                  >
                    Income
                  </span>
                </div>
              </div>

              <div
                className={`flex gap-2 px-4 justify-end sm:px-0  ${
                  atTop ? "block sm:block" : "block sm:block"
                }`}
              >
                <div
                  className={`sm:hidden gap-5 flex pb-5 ${
                    atTop ? "block" : "hidden"
                  }`}
                >
                  <button
                    onClick={exportButton}
                    className="text-white px-3 py-2 rounded-sm border border-white text-[clamp(10px,0.8vw,16px)] cursor-pointer hover:bg-white hover:text-black"
                  >
                    Export
                  </button>
                  <button
                    onClick={toggleTransaction}
                    className="add-new-transaction mr-1.5 bg-primary text-[clamp(10px,0.8vw,16px)] text-white rounded-sm px-[20px] py-[10px] cursor-pointer hover:text-black hover:bg-white transition-colors duration-300"
                  >
                    + Add New
                  </button>
                </div>
                <div className="hidden sm:flex gap-5 pb-5">
                  <button
                    onClick={exportButton}
                    className="text-white px-3 py-2 rounded-sm border border-white text-[clamp(10px,0.8vw,16px)] cursor-pointer hover:bg-white hover:text-black"
                  >
                    Export
                  </button>
                  <button
                    onClick={toggleTransaction}
                    className="add-new-transaction mr-1.5 bg-primary text-[clamp(10px,0.8vw,16px)] text-white rounded-sm px-[20px] py-[10px] cursor-pointer hover:text-black hover:bg-white transition-colors duration-300"
                  >
                    + Add New
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`table w-full text-left bg-cover bg-center bg-no-repeat rounded-lg ${
                flag
                  ? "bg-white/4 backdrop-blur-md rounded-lg"
                  : "bg-[#111111] rounded-lg"
              }`}
            >
              <div
                className={`table-head hidden sm:flex px-5 py-4 justify-between rounded-lg 
    ${
      flag
        ? "bg-white/4 backdrop-blur-3xl text-white"
        : "bg-cardbg text-primary"
    }`}
              >
                <div className="flex-1">Category</div>
                <div className="flex-1 pl-8">Type</div>
                <div className="flex-2 pl-2">Description</div>
                <div className="flex-1">Date</div>
                <div className="flex-1 pr-3 text-end">Amount</div>
                <div className="flex-[0.4] text-center"></div>
              </div>

              <div className="table-body text-white capitalize">
                {transactions.length > 0 ? (
                  <>
                    {showTrans === "all" && (
                      <TransactionList
                        grouped={grouped}
                        onDelete={deleteButton}
                        flag={flag}
                      />
                    )}

                    {showTrans === "expense" && (
                      <>
                        {totalExpenseCount > 0 ? (
                          <ExpenseList
                            groupedExpense={groupedExpense}
                            onDelete={deleteButton}
                            flag={flag}
                          />
                        ) : (
                          <div className="empty-state flex normal-case justify-center items-center h-[30vh] px-5 text-center text-gray-400">
                            <p>
                              No expense transactions yet. Start by adding one!
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {showTrans === "income" && (
                      <>
                        {totalIncomeCount > 0 ? (
                          <IncomeList
                            groupedIncome={groupedIncome}
                            onDelete={deleteButton}
                            flag={flag}
                          />
                        ) : (
                          <div className="empty-state flex normal-case justify-center items-center h-[30vh] px-5 text-center text-gray-400">
                            <p>
                              No income transactions yet. Start by adding one!
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="empty-state flex justify-center items-center h-[30vh] px-5 text-center text-gray-400">
                    <p>No transactions yet. Start by adding one!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`add-container transition-all duration-300 ease-out
      animate-squeezeIn px-5 pt-8 pb-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white/4 backdrop-blur-md text-white z-50 rounded-xl w-[90%] max-w-[400px] min-w-[300px]
            ${displayTransaction === "hidden" ? "hidden" : ""}`}
      >
        <div className="add-transaction-top px-5 flex justify-between items-center">
          <h1 className="text-2xl">Add Transaction</h1>
          <button
            onClick={toggleTransaction}
            className="p-0 m-0 hover:scale-120 cursor-pointer transition-all duration-100"
          >
            <img className="w-5" src={closeIcon} alt="closeIcon" />
          </button>
        </div>
        <div className="transaction-form-container">
          <form
            onSubmit={handleSubmit}
            className="transaction-form flex flex-col gap-4 text-white p-6 rounded-lg"
          >
            <label className="flex flex-col">
              <span className="mb-1">Category</span>
              <input
                type="text"
                name="category"
                placeholder="Food"
                required
                value={formData.category}
                onChange={handleChange}
                className="p-2 rounded  text-white border border-white placeholder-gray-400 placeholder:text-sm"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Type</span>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="p-2 rounded border border-white placeholder-gray-400 text-white placeholder:text-sm"
              >
                <option value="" disabled className="text-gray-700">
                  Select Type
                </option>
                <option value="expense" className="bg-black text-expense">
                  Expense
                </option>
                <option value="income" className="bg-black text-budget">
                  Income
                </option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Amount</span>
              <input
                type="number"
                name="amount"
                placeholder="200"
                required
                value={formData.amount}
                onChange={handleChange}
                className="p-2 rounded text-white border border-white placeholder-gray-400 placeholder:text-sm"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Description</span>
              <textarea
                name="description"
                placeholder="Dinner with Friends..."
                required
                value={formData.description}
                onChange={handleChange}
                className="p-2 rounded text-white border border-white placeholder-gray-400 placeholder:text-sm"
              />
            </label>

            <button
              disabled={loadingState}
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer"
            >
              {loadingState ? "Adding..." : "Add Transaction"}
            </button>
          </form>
        </div>
      </div>

      {confirmDelete ? (
        <div
          className="delete-popup transition-all duration-300 ease-out
      animate-squeezeIn p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-white/4 backdrop-blur-md text-white z-50 rounded-xl w-[90%] max-w-[400px] min-w-[300px] flex justify-center items-center flex-col gap-5"
        >
          <h1 className="m-0 p-0">
            Are you sure you want to delete this Tansaction ?
          </h1>
          <div className="flex justify-center items-center gap-10">
            <button
              onClick={() => yesButton(currentId)}
              className="yes bg-primary py-1 px-4 rounded cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(!confirmDelete)}
              className="no bg-gray-500 text-white py-1 px-4 rounded cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      ) : null}

      {download ? (
        <div
          className="export-popup transition-all duration-300 ease-out
      animate-squeezeIn p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             text-white z-50 rounded-xl w-[90%] max-w-[400px] min-w-[300px] flex justify-center items-center flex-col bg-white/4 backdrop-blur-md"
        >
          <button
            className="p-0 m-0 hover:scale-120 cursor-pointer transition-all duration-100"
            onClick={exportButton}
          >
            <img className="w-5" src={closeIcon} alt="closeIcon" />
          </button>
          <div className="flex flex-col gap-5 pb-3">
            {transactions.length > 0 ? (
              <>
                <h1 className="m-2 p-0">
                  Export Transactions as Pdf or Excel ?
                </h1>

                <div className="flex justify-center items-center gap-10">
                  <button
                    onClick={downloadExcel}
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition cursor-pointer text-[clamp(10px,0.8vw,16px)]"
                  >
                    Export Excel
                  </button>

                  <button
                    onClick={downloadPDF}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition cursor-pointer text-[clamp(10px,0.8vw,16px)]"
                  >
                    Export PDF
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state flex justify-center items-center py-5 px-5 text-center text-gray-400">
                <p>No transactions to export. Start by adding one!</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    
    </div>
  );
}
