import React from "react";
import "./MainContent.css";

export default function MainContent() {
  const features = [
    { id: 1, title: "Feature 1", description: "Description for feature 1" },
    { id: 2, title: "Feature 2", description: "Description for feature 2" },
    { id: 3, title: "Feature 3", description: "Description for feature 3" },
    { id: 4, title: "Feature 4", description: "Description for feature 4" },
    { id: 5, title: "Feature 5", description: "Description for feature 5" },
  ];

  return (
    <div>
      <main className="content-wrapper">
        <section className="intro-section">
          <h2>Introduction</h2>
          <p>
            Explore our amazing features designed to streamline your workflow and boost productivity.
          </p>
        </section>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
