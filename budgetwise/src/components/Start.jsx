import React from "react";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

function Start() {
  return (
    <div className="px-4 py-5 my-5 text-center" >
      <h1 className="display-5 fw-bold text-body-emphasis">
       <BiRupee/>BudgetWise
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Track your expenses, manage budgets, and plan your financial future
          with ease using BudgetWise — your personal finance companion.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/signin" className="btn btn-primary btn-lg px-4 gap-3">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-outline-secondary btn-lg px-4">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
