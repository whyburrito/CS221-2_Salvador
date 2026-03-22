import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchOrders();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container"><p>Loading orders...</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h2>My Order History</h2>
      {orders.length === 0 ? (
        <p style={{ marginTop: '1rem' }}>You have no orders yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Order ID</th>
              <th style={{ padding: '0.5rem' }}>Date</th>
              <th style={{ padding: '0.5rem' }}>Items</th>
              <th style={{ padding: '0.5rem' }}>Total</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
              <th style={{ padding: '0.5rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.5rem' }}>{order._id}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text)', opacity: 0.8 }}>
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>{item.qty}x {item.name}</li>
                    ))}
                  </ul>
                </td>
                <td style={{ padding: '0.5rem' }}>${order.totalPrice.toFixed(2)}</td>
                <td style={{ padding: '0.5rem', fontWeight: 'bold', color: order.orderStatus === 'Cancelled' ? '#ef4444' : 'inherit' }}>
                  {order.orderStatus}
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <button 
                    onClick={() => handleCancel(order._id)}
                    disabled={order.orderStatus !== "Pending"}
                    style={{ 
                      padding: '0.25rem 0.5rem', 
                      fontSize: '0.875rem', 
                      background: order.orderStatus === "Pending" ? '#ef4444' : 'var(--border)',
                      color: order.orderStatus === "Pending" ? 'white' : 'var(--text)',
                      cursor: order.orderStatus === "Pending" ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}