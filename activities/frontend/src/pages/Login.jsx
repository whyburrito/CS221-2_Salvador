import { useState } from "react";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import "../pages/Login.css";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState();

  return (
    <Card title="Welcome Back">
      <form className="login-form">
        <Input
          label="Email"
          type="email"
          name="email"
          error={errors.email}
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          error={errors.password}
          placeholder="Enter your password"
          required
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>

        <p className="auth-link">Don't have an account? Register here</p>
      </form>
    </Card>
  );
};

export default Login;
