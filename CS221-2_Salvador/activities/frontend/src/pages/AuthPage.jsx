import Card from "../components/Card";
import { useState } from "react";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import "./Auth.css";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'

  return (
    <Card title={activeTab === "login" ? "Welcome Back" : "Create an Account"}>
      <div className="auth-tabs">
        <button
          className={`tab-button ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`tab-button ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>
      <div className="auth-content">
        {activeTab === "login" ? <LoginComponent /> : <RegisterComponent />}
      </div>
    </Card>
  );
};
export default AuthPage;
