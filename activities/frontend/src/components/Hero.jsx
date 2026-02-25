import React from "react";
import Button from "./button";
import "./Hero.css";

export default function Hero({ title, description, buttonText }) {
  return (
    <div>
      <section className="hero-container">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <Button variant="primary" type="button">
            {buttonText}
          </Button>
        </div>
      </section>
    </div>
  );
}
