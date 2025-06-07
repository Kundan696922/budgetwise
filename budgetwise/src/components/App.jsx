import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import History from "./History";
import Report from "./Report";
import New from "./New";
import Saved from "./Saved";
import Start from "./Start";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { TxProvider } from "./TxContext";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Settings from "./Settings";

function App() {
  return (
    <TxProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Redirect root to /start */}
            <Route path="/" element={<Navigate to="/start" replace />} />

            {/* Starting Page */}
            <Route path="/start" element={<Start />} />

            {/* Auth Pages */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <div>
                  <Header />
                  <main>
                    <div className="d-flex min-vh-100 pt-3">
                      <Sidebar />
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/new" element={<New />} />
                        <Route path="/saved" element={<Saved />} />
                        <Route path="/report" element={<Report />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </TxProvider>
  );
}


export default App;