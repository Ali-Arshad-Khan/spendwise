import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../components/DashboardProvider";
import { useTransactions } from "../hooks/useTransactions";
import IncomeList from "../components/transactions/IncomeList";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function Income() {
  const {
    flag,
    pp,
    transactions,
    fetchTransactions,
    confirmDelete,
    setConfirmDelete,
    currentId,
    yesButton,
    deleteButton,
  } = useContext(DashboardContext);
  const [data, setData] = useState([]);

  const { groupedIncome, totalIncomeCount } = useTransactions();

  // ✅ Fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    async function prepareData() {
      try {
        const income = transactions.filter((t) => t.type === "income");

        const monthlyTotals = {};

        income.forEach((t) => {
          const date = new Date(t.date);
          const month = date.toLocaleString("default", { month: "long" });
          monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(t.amount);
        });

        const formatted = Object.entries(monthlyTotals).map(
          ([month, total]) => ({
            month,
            total,
            label: `₹ ${total.toLocaleString("en-IN")}`,
          })
        );

        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    }
    prepareData();
  }, [transactions]);

  return (
    <div
      className="h-full min-h-[100vh] flex w-full bg-cover bg-center bg-mainbg bg-no-repeat"
      style={pp}
    >
      <div className="main h-full lg:ml-[280px] w-full flex-1 text-white py-[30px] px-[20px] md:px-[20px] lg:px-[30px]">
        <div className="dashboard-title mb-[20px] flex items-center gap-5">
          <h2 className="text-[clamp(16px,2.5vw,32px)] font-bold mb-2">
            All Income Transactions
          </h2>
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

        {/* Bar Chart */}
        <div
          className={`rounded-lg w-full mb-10 mt-5 ${
            flag ? "bg-white/4 backdrop-blur-md" : ""
          }`}
          style={{ height: "50vh", minHeight: "300px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 40, right: 40, left: 20, bottom: 20 }}
              style={{ background: "transparent" }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  background: "#222",
                  border: "1px solid #444",
                  color: "white",
                }}
                formatter={(value) => `₹ ${value.toLocaleString("en-IN")}`}
              />
              <Bar
                dataKey="total"
                fill="#4ADE80"
                barSize={45}
                radius={[6, 6, 6, 6]}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="label"
                  position="top"
                  fill="white"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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
            {totalIncomeCount > 0 ? (
              <IncomeList
                groupedIncome={groupedIncome}
                flag={flag}
                onDelete={deleteButton} // ✅ pass delete handler
              />
            ) : (
              <div className="empty-state flex normal-case justify-center items-center h-[30vh] px-5 text-center text-gray-400">
                <p>No income transactions yet. Start by adding one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
