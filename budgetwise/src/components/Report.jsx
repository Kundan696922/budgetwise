import React, { useContext, useEffect, useRef } from "react";
import { TxContext } from "./TxContext";
import Chart from "chart.js/auto";

export default function Report() {
  const { transactions } = useContext(TxContext);
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // destroy previous chart instance before creating new
    }

    // Prepare data grouped by date
    // Let's assume dates are string in 'YYYY-MM-DD' format, sort and group them
    const groupedData = transactions.reduce((acc, tx) => {
      const date = tx.date;
      if (!acc[date]) acc[date] = { income: 0, expense: 0 };
      if (tx.type.toLowerCase() === "income") {
        acc[date].income += Number(tx.amount);
      } else {
        acc[date].expense += Number(tx.amount);
      }
      return acc;
    }, {});

    // Sort dates ascending
    const sortedDates = Object.keys(groupedData).sort();

    // Extract data for chart
    const incomeData = sortedDates.map((date) => groupedData[date].income);
    const expenseData = sortedDates.map((date) => groupedData[date].expense);

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: sortedDates,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            borderColor: "green",
            backgroundColor: "rgba(0,128,0,0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
          {
            label: "Expense",
            data: expenseData,
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Format y-axis ticks as INR currency
              callback: function (value) {
                return `₹${value}`;
              },
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions]);

  return (
    <div className="container pt-5">
      <h3>Report</h3>
      <canvas
        id="myChart"
        ref={chartRef}
        width={1152}
        height={486}
        style={{ display: "block", boxSizing: "border-box" }}
      />
    </div>
  );
}
