import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TxContext } from "./TxContext";
import { FaPlus } from "react-icons/fa";

export default function Saved() {
  const { transactions, setTransactions } = useContext(TxContext);
  const navigate = useNavigate();

  const handleConfirm = (index) => alert(`Confirm transaction #${index + 1}`);
  const handleEdit = (index) => {
    const transaction = transactions[index];
  
    const editedType = prompt("Edit Type:", transaction.type);
    const editedAmount = prompt("Edit Amount:", transaction.amount);
    const editedCategory = prompt("Edit Category:", transaction.category);
    const editedDate = prompt("Edit Date:", transaction.date);
  
    if (!editedType || !editedAmount || !editedCategory || !editedDate) {
      alert("Edit cancelled or missing fields.");
      return;
    }
  
    const editedDescOrSource = prompt(
      editedType.toLowerCase() === "expense" ? "Edit Description:" : "Edit Source:",
      editedType.toLowerCase() === "expense" ? transaction.description : transaction.source
    );
  
    if (!editedDescOrSource) {
      alert("Edit cancelled.");
      return;
    }
  
    const updatedTransaction = {
      type: editedType,
      amount: editedAmount,
      category: editedCategory,
      date: editedDate,
      ...(editedType.toLowerCase() === "expense"
        ? { description: editedDescOrSource }
        : { source: editedDescOrSource }),
    };
  
    const updatedList = [...transactions];
    updatedList[index] = updatedTransaction;
    setTransactions(updatedList);
  };
  
  const handleSkip = (index) => {
    const updatedList = transactions.filter((_, i) => i !== index);
    setTransactions(updatedList);
  };
  
  
  
  const handleAddNew = () => navigate("/new");

  if (transactions.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>No saved transactions</h3>
        <button className="btn btn-primary mt-3" onClick={handleAddNew}>
          <FaPlus className="me-2" /> New
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-right align-items-start align-items-md-center mb-4 px-2 gap-lg-5 gap-md-5">
        <h2 className="mb-3 mb-md-0 pt-2 pt-lg-0">Saved Transactions</h2>
        <button className="btn btn-sm btn-primary" onClick={handleAddNew}>
          <FaPlus className="me-2" /> New
        </button>
      </div>

      <div className="row g-4">
        {transactions.map((item, idx) => {
          const columnClass =
          transactions.length === 1
            ? "col-12 col-md-6 col-lg-4"
            : transactions.length === 2
            ? "col-12 col-md-6 col-lg-6"
            : "col-12 col-md-5 col-lg-4";
        

          return (
            <div
              key={idx}
              className={`${columnClass} d-flex align-items-stretch`}
            >
              <div className="card shadow-sm border-0 rounded-4 w-100 d-flex flex-column">
                <div className="card-body flex-grow-1 d-flex flex-column">
                  <h5 className="card-title text-capitalize mb-3">
                    {item.type}
                  </h5>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <strong>Amount:</strong> ₹{item.amount}
                    </li>
                    <li>
                      <strong>Category:</strong> {item.category}
                    </li>
                    {item.type === "expense" ? (
                      <li>
                        <strong>Description:</strong> {item.description}
                      </li>
                    ) : (
                      <li>
                        <strong>Source:</strong> {item.source}
                      </li>
                    )}
                    <li>
                      <small className="text-muted">Date: {item.date}</small>
                    </li>
                  </ul>
                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-between gap-2 px-2 py-2">
                  <button
                    className="btn btn-success btn-sm w-100"
                    onClick={() => handleConfirm(idx)}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-warning btn-sm w-100"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary btn-sm w-100"
                    onClick={() => handleSkip(idx)}
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
