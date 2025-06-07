import React from "react";
import { FiMenu } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { useAuth } from "./AuthContext";

function Header() {
  const { user } = useAuth();

  const username = user?.fullName || user?.email || "User";

  const randomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  };

  const profileBg = React.useMemo(() => randomColor(), []);

  return (
    <header
      className="navbar fixed-top bg-success flex-md-nowrap p-1 shadow d-flex align-items-center justify-content-between"
      data-bs-theme="dark"
    >
      <a
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white fs-4 d-flex align-items-center gap-1"
        href="#"
      >
        <BiRupee size={28} />
        BudgetWise
      </a>

      <ul className="navbar-nav flex-row d-md-none">
        <li className="nav-item text-nowrap">
          <button
            className="nav-link px-3 text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FiMenu size={20} />
          </button>
        </li>
      </ul>

      {/* Profile circle visible only on md+ */}
      <div
        className="d-none d-md-flex align-items-center justify-content-center"
        style={{
          width: 37,
          height: 37,
          borderRadius: "50%",
          backgroundColor: profileBg,
          color: "#333",
          fontWeight: "bold",
          fontSize: "1.2rem",
          userSelect: "none",
            marginRight: "1.5rem",
            marginTop: "0.5rem",
          marginBottom:"0.5rem"
        }}
        title={username}
      >
        {username.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}

export default Header;
