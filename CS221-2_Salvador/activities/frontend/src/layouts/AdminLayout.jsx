import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user || user.role !== "Admin") {
    // If not admin, we might want to return null or redirect
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Unauthorized</h2>
        <p>You must be an admin to view this page.</p>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ 
        width: "250px", 
        backgroundColor: "var(--card-bg)", 
        borderRight: "1px solid var(--border)",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{ color: "var(--primary)", marginBottom: "2rem", paddingLeft: "1rem" }}>Admin Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/admin/products" style={{ padding: "0.75rem 1rem", borderRadius: "0.5rem", display: "block", textDecoration: "none", color: "var(--text)" }}>
            Product Management
          </Link>
          <Link to="/admin/orders" style={{ padding: "0.75rem 1rem", borderRadius: "0.5rem", display: "block", textDecoration: "none", color: "var(--text)" }}>
            Order Management
          </Link>
        </nav>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem", padding: "0 1rem" }}>
          <button 
            onClick={toggleTheme} 
            style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button onClick={handleLogout} style={{ background: "#ef4444" }}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}