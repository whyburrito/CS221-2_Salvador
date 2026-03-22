import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (!isLogin && password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      if (isLogin) {
        const user = await login(email, password);
        if (user.role === "Admin") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      } else {
        const res = await fetch("http://localhost:3000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password })
        });
        if (res.ok) {
          setIsLogin(true);
          setError("Registration successful! Please log in.");
        } else {
          const data = await res.json();
          setError(data.message || "Registration failed");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <label>Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ paddingRight: '2.5rem' }}
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            style={{ 
              position: 'absolute', 
              right: '0.5rem', 
              top: '2rem', 
              background: 'none', 
              border: 'none', 
              color: 'var(--text)', 
              padding: '0',
              opacity: 0.6,
              cursor: 'pointer'
            }}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>
        {!isLogin && (
          <div className="form-group" style={{ position: 'relative' }}>
            <label>Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              required 
              style={{ paddingRight: '2.5rem' }}
            />
          </div>
        )}
        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: 'var(--primary)', padding: 0 }}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}