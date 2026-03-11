import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div>
      <Header />
      <Hero
        title="Welcome to My App"
        description="Discover a new way to manage your inventory with our powerful and intuitive platform."
        buttonText="Get Started"
      />
      <MainContent />
      <Footer />
    </div>
  );
}
