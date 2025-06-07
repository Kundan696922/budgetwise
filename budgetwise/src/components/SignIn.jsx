import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake auth - replace with your real auth logic here
    if (email && password) {
      signIn({ email }); // save user email as example
      navigate("/dashboard"); // redirect to dashboard after sign in
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-body-tertiary"
      style={{ minHeight: "100vh" }}
    >
      <main className="form-signin w-100" style={{ maxWidth: "330px" }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>

          <p className="mt-3 mb-3 text-muted text-center">&copy; 2025 BudgetWise</p>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
