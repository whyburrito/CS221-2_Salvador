import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, username: payload.name || payload.username, role: payload.role });
      } catch(e) {
        console.error("Invalid token");
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ id: data._id, username: data.username, role: payload.role });
      return { id: data._id, username: data.username, role: payload.role };
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);