import Card from "../components/Card";
import Button from "../components/button";
import Input from "../components/Input";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setLoading(true); // Start loading

    try {
      console.log(formData);
      await login(formData);
      alert("Login Successful");
    } catch (error) {
      console.error("Login Failed:", error); // <--- ADD THIS to see the error in logs
      setErrors({ serverError: error.message }); // Use a clear key
    } finally {
      setLoading(false); // Stop loading regardless of success/fail
    }
  };
  return (
    <Card title="Welcome Back">
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your Email"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your Password"
          required
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
        <p className="äuth-link"> Don't have an account? Register here</p>
      </form>
    </Card>
  );
};
export default Login;
