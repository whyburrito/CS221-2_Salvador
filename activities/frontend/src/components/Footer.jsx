import React from "react";
import "./Footer.css";

export default function () {
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>My App</h3>
            <p>
              RAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH2
            </p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/inventory">Inventory</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2026 My App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
