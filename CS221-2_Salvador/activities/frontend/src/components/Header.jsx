import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className="landing-header">
        <div className="header-container">
          <div className="logo">
            <h2>My App</h2>
          </div>
          <nav className="navigation">
            <a href="/">Home</a>
            <a href="/authPage">Login</a>
            <a href="/inventory">Inventory</a>
          </nav>
          <div className="auth-section">
            <Button variant="primary" type="button" onClick={() => navigate("/authPage")}>
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
