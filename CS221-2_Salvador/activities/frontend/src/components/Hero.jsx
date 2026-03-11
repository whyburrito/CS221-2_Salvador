import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import "./Hero.css";

export default function Hero({ title, description, buttonText }) {
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero-container">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <Button variant="primary" type="button" onClick={() => navigate("/authPage")}>
            {buttonText}
          </Button>
        </div>
      </section>
    </div>
  );
}
