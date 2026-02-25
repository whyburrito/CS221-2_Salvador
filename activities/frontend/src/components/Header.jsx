import React from "react";
import Button from "./button";
import "./Header.css";

export default function Header() {
  return (
    <>
      <header className="landing-header">
        <div className="header-container">
          <div className="logo">
            <h2>My App</h2>
          </div>
          <nav className="navigation">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/inventory">Inventory</a>
          </nav>
          <div className="auth-section">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
