import React, { useContext, useState, useEffect } from "react";
import { TxContext } from "./TxContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";



const formatCurrency = (num) => {
  if (num >= 1_00_00_000) return `₹${(num / 1_00_00_000).toFixed(1)}Cr`;
  if (num >= 1_00_000) return `₹${(num / 1_00_000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
};

const COLORS_EXPENSE = ["#f44336", "#e57373", "#ef9a9a", "#ffcdd2", "#b71c1c"];
const COLORS_BALANCE = ["#1976d2", "#bbdefb"];

function Dashboard() {
  const { transactions } = useContext(TxContext);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);

  // Extract unique months from transactions
  useEffect(() => {
    const uniqueMonths = Array.from(
      new Set(
        transactions.map((tx) => {
          const d = new Date(tx.date);
          if (isNaN(d.getTime())) {
            console.warn("Invalid date in transaction:", tx.date);
            return null;
          }
          return `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a));
    setMonths(uniqueMonths);
  }, [transactions]);

  // Set default selected month when months update
  useEffect(() => {
    if (months.length > 0 && !selectedMonth) {
      setSelectedMonth(months[0]);
    }
  }, [months, selectedMonth]);

  // Filter transactions by selected month
  const filteredTx = transactions.filter((tx) => {
    const d = new Date(tx.date);
    if (isNaN(d.getTime())) return false;
    const ym = `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    return ym === selectedMonth;
  });

  // Calculate totals safely
  const income = filteredTx
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const expense = filteredTx
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + Number(tx.amount), 0);

  const cashInHand = income - expense;
  const noOfTransactions = filteredTx.length;

  // Group expenses by category
  const expenseCategories = {};
  filteredTx
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      if (!expenseCategories[tx.category]) {
        expenseCategories[tx.category] = 0;
      }
      expenseCategories[tx.category] += Number(tx.amount);
    });

  const expenseData = Object.entries(expenseCategories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const semiCircleData = [
    { name: "Spent", value: expense, color: COLORS_BALANCE[0] },
    { name: "Balance", value: cashInHand, color: COLORS_BALANCE[1] },
  ];

  return (
    <div className="container-fluid p-5">
      <h2 className="mb-4">Dashboard</h2>

      {months.length > 0 && (
        <div className="mb-4">
          <label htmlFor="monthSelect" className="form-label fw-bold">
            Select Month:
          </label>
          <select
            id="monthSelect"
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {new Date(`${month}-01`).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* First Row Cards */}
      <div className="row mb-4">
        <div className="col-md-5 col-lg-3 mb-3">
          <div className="card bg-success text-white text-center p-3 ">
            <h5>Income</h5>
            <h4>{formatCurrency(income)}</h4>
          </div>
        </div>
        <div className="col-md-5 col-lg-3 mb-3">
          <div className="card bg-danger text-white text-center p-3">
            <h5>Expense</h5>
            <h4>{formatCurrency(expense)}</h4>
          </div>
        </div>
        <div className="col-md-5 col-lg-3 mb-3">
          <div className="card bg-warning text-dark text-center p-3">
            <h5>Cash In Hand</h5>
            <h4>{formatCurrency(cashInHand)}</h4>
          </div>
        </div>
        <div className="col-md-5 col-lg-3 mb-3">
          <div className="card bg-info text-white text-center p-3">
            <h5>No. of Transactions</h5>
            <h4>{noOfTransactions}</h4>
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Expense by Category</h5>
              {expenseData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {expenseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS_EXPENSE[index % COLORS_EXPENSE.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted">No expense data.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Spent vs Balance</h5>
              {income > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={semiCircleData}
                      dataKey="value"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      label={(entry) =>
                        `${entry.name}: ${formatCurrency(entry.value)}`
                      }
                    >
                      {semiCircleData.map((entry, index) => (
                        <Cell
                          key={`cell-balance-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend/>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted">No data to show.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
