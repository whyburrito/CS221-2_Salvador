import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Please log in to checkout</h2>
        <button onClick={() => navigate("/authPage")} style={{ marginTop: '1rem' }}>Go to Login</button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          orderItems: cartItems,
          totalPrice: cartTotal
        })
      });
      
      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to place order");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Checkout Summary</h2>
      {error && <p className="error-text">{error}</p>}
      <div style={{ margin: '2rem 0' }}>
        {cartItems.map(item => (
          <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{item.name} (x{item.qty})</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <hr style={{ margin: '1rem 0', borderColor: 'var(--border)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      <button 
        onClick={handlePlaceOrder} 
        disabled={loading || cartItems.length === 0} 
        style={{ width: '100%', fontSize: '1.1rem' }}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}