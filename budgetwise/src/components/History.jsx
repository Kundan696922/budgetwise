import React, { useContext, useState } from "react";
import { TxContext } from "./TxContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function History() {
  const { transactions } = useContext(TxContext);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [customDate, setCustomDate] = useState("");

  const filterByDate = (txDate) => {
    const tx = new Date(txDate);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const txStr = tx.toDateString();
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();
    const customStr = new Date(customDate).toDateString();

    if (filterDate === "today") return txStr === todayStr;
    if (filterDate === "yesterday") return txStr === yesterdayStr;
    if (filterDate === "custom") return txStr === customStr;
    return true;
  };

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.description?.toLowerCase().includes(search.toLowerCase()) ||
      tx.category?.toLowerCase().includes(search.toLowerCase()) ||
      tx.source?.toLowerCase().includes(search.toLowerCase());

    return matchSearch && filterByDate(tx.date);
  });

    return (
      <section className="w-100 w-lg-100">
    <div className="container-fluid px-4 px-lg-3 py-3 py-lg-2 mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <h3>Transaction History</h3>
      </div>

      {/* Search and Filters */}
      <div className="row g-3 mb-4">
        <div className="col-10 col-md-12 col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-10 col-md-3 col-lg-2">
          <select
            className="form-select"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="custom">Custom Date</option>
          </select>
              </div>
              
        <div className="col-12 col-sm-6 col-md-4 pt-2">
              <small className="text-muted">
          Showing 1 to {filtered.length} of {transactions.length}
        </small>
        </div>
          

        {filterDate === "custom" && (
          <div className="col-12 col-sm-6 col-md-3">
            <input
              type="date"
              className="form-control"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-responsive">
     {filtered.length === 0 ? (
     <div className="alert alert-warning text-center">
      No transactions found.
    </div>
     ) : (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Category</th>
          <th>Description / Source</th>
          <th className="text-end">Amount</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td >{item.category}</td> 
            <td style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.type === "expense" ? item.description : item.source}
            </td>
            <td
              className={`text-end fw-bold ${
                item.type === "income" ? "text-success" : "text-danger"
              }`}
            >
              {item.type === "income" ? "+" : "-"}₹{item.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      </div>
</section>
  );
}
