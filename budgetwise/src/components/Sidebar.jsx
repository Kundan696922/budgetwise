import React from "react";
import {
  BsGridFill,
  BsClockHistory,
  BsBookmarkFill,
  BsPlusCircleFill,
  BsGraphUp,
  BsGearWideConnected,
  BsDoorClosed,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "bootstrap";
import { useAuth } from "./AuthContext"; // Make sure you have this AuthContext setup

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const closeSidebar = () => {
    const offcanvasEl = document.getElementById("sidebarMenu");
    const bsOffcanvas = Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  const handleSignOut = () => {
    closeSidebar();
    // Optionally clear user data here (e.g., localStorage.clear())
    navigate("/start"); // navigate to start page
  };

  const username = user?.fullName || user?.email || "User";

  const randomColor = React.useMemo(() => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  }, []);

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary mt-4 pt-2">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            BudgetWise
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 pt-md-3 overflow-y-auto">
          {/* Profile circle - only visible on small devices */}
          <div
            className="d-md-none mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: randomColor,
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.5rem",
              userSelect: "none",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            title={username}
          >
            {username.charAt(0).toUpperCase()}
          </div>

          <ul className="nav flex-column ">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link d-flex align-items-center gap-2 active text-dark"
                onClick={closeSidebar}
              >
                <BsGridFill />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/history"
                className="nav-link d-flex align-items-center gap-2 text-dark"
                onClick={closeSidebar}
              >
                <BsClockHistory />
                Transaction History
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/new"
                className="nav-link d-flex align-items-center gap-2 text-dark"
                onClick={closeSidebar}
              >
                <BsPlusCircleFill />
                New Transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/saved"
                className="nav-link d-flex align-items-center gap-2 text-dark"
                onClick={closeSidebar}
              >
                <BsBookmarkFill />
                Saved Transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/report"
                className="nav-link d-flex align-items-center gap-2 text-dark"
                onClick={closeSidebar}
              >
                <BsGraphUp />
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/settings"
                className="nav-link d-flex align-items-center gap-2 text-dark"
                onClick={closeSidebar}
              >
                <BsGearWideConnected />
                Settings
              </Link>
            </li>
            <li className="nav-item" onClick={handleSignOut}>
              <Link
                to="/signout"
                className="nav-link d-flex align-items-center gap-2 text-dark"
              >
                <BsDoorClosed />
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
