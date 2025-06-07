import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("budgetwiseUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem("budgetwiseUser", JSON.stringify(userData));
    navigate("/dashboard");
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("budgetwiseUser");
    navigate("/signin");
  };

  // Add updateUser function
  const updateUser = (updates) => {
    return new Promise((resolve, reject) => {
      try {
        // Merge current user with updates
        const updatedUser = { ...user, ...updates };

        // Save to state and localStorage
        setUser(updatedUser);
        localStorage.setItem("budgetwiseUser", JSON.stringify(updatedUser));

        // Simulate async operation success
        resolve(updatedUser);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
