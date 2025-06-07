import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TxContext } from "./TxContext";  

const categories = [
  "Other",
  "Food",
  "Household",
  "Clothing",
  "Education",
  "Healthcare"
];

function ExpenseForm({ onSubmit, onCancel }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");

  const handleSubmit = (e) => {
    e.preventDefault();
      onSubmit({ type: "expense", amount, description, date, category });
      alert("your expense have been submiteed see saved transactions for details");
    resetForm();
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setDate("");
    setCategory("Other");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">Add Expense</h5>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="d-flex justify-content-start gap-2">
        <button type="submit" className="btn btn-sm btn-success">Save expense</button>
        <button type="button" className="btn btn-sm btn-danger" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function IncomeForm({ onSubmit, onCancel }) {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");

  const handleSubmit = (e) => {
    e.preventDefault();
      onSubmit({ type: "income", amount, source, date, category });
      alert("your income have been submiteed see saved transactions for details");
    resetForm();
    };
    

  const resetForm = () => {
    setAmount("");
    setSource("");
    setDate("");
    setCategory("Other");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">Add Income</h5>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Source</label>
        <input type="text" className="form-control" value={source} onChange={(e) => setSource(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="d-flex justify-content-start gap-2">
        <button type="submit" className="btn btn-sm btn-success">Save income</button>
        <button type="button" className="btn btn-sm btn-danger" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function New() {
  const [activeForm, setActiveForm] = useState("expense");
  const { addTransaction } = useContext(TxContext);
  const handleTransactionSubmit = (transaction) => {
    addTransaction(transaction);
  };

  const handleCancel = () => {
    setActiveForm(null);
  };

    return (
        
      <div className="container-fluid py-3 mt-5">
      <div className="row w-100 px-3 align-items-center">
        
        {/* Left Column: Text Section */}
        <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
          <h2 className="display-5  fw-bold">Track Your Finances</h2>
          <p className="lead">Manage your income and expenses easily with BudgetWise.</p>
        </div>
    
        {/* Right Column: Form Section */}
        <div className="col-12 col-md-6">
          <div className="mb-4 d-flex gap-3 justify-content-center justify-content-md-start">
            <button className="btn btn-sm btn-outline-primary" onClick={() => setActiveForm("expense")}>
              Add Expense
            </button>
            <button className="btn btn-sm btn-outline-success" onClick={() => setActiveForm("income")}>
              Add Income
            </button>
          </div>
    
          <div className="card p-4 shadow">
            {activeForm === "expense" && (
              <ExpenseForm onSubmit={handleTransactionSubmit} onCancel={handleCancel} />
            )}
            {activeForm === "income" && (
              <IncomeForm onSubmit={handleTransactionSubmit} onCancel={handleCancel} />
            )}
            {!activeForm && <p>Select a form to begin.</p>}
          </div>
        </div>
      </div>
    </div>
          
          
  );
}
