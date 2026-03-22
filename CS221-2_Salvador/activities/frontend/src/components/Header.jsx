import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>S-Retail Hub</Link>
      <nav className="nav-links">
        <Link to="/products">All Products</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user ? (
          <>
            <Link to="/order-history">Orders</Link>
            {user.role === "Admin" && <Link to="/admin/products">Admin Panel</Link>}
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/authPage">Login</Link>
        )}
        <button 
          onClick={toggleTheme} 
          style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>
    </header>
  );
}