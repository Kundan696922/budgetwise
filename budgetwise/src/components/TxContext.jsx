import React, { createContext, useState, useMemo } from "react";

export const TxContext = createContext();

export function TxProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <TxContext.Provider value={{ transactions, setTransactions, addTransaction }}>
      {children}
    </TxContext.Provider>
  );
}
