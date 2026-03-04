import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../Input";
import Button from "../button";
import "../../pages/Auth.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await login(formData);
      alert("Login Successful");
      navigate("/inventory");
    } catch (error) {
      alert("Login Failed: " + error.message);
      setErrors({ serverError: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {errors.serverError && (
        <p className="error-message">{errors.serverError}</p>
      )}
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
    </form>
  );
};

export default LoginComponent;
