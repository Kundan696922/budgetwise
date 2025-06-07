import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signIn } = useAuth(); // reuse signIn or create signUp method if you want
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with real sign up logic
    if (name && email && password) {
      // For now, just sign in user after signup
      signIn({ name, email });
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-body-tertiary"
      style={{ minHeight: "100vh" }}
    >
      <main className="form-signup w-100" style={{ maxWidth: "330px" }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal text-center">Create an account</h1>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingEmail">Email address</label>
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
            Sign up
          </button>

          <p className="mt-3 mb-3 text-muted text-center">&copy; 2025 BudgetWise</p>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
