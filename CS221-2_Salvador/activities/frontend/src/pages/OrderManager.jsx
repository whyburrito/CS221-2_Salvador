import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Completed', 'Cancelled'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="card">
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p style={{ marginTop: '1rem' }}>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Order ID</th>
              <th style={{ padding: '0.5rem' }}>User</th>
              <th style={{ padding: '0.5rem' }}>Date</th>
              <th style={{ padding: '0.5rem' }}>Items</th>
              <th style={{ padding: '0.5rem' }}>Total</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.5rem' }}>{order._id}</td>
                <td style={{ padding: '0.5rem' }}>{order.user?.username || order.user}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text)', opacity: 0.8 }}>
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>{item.qty}x {item.name}</li>
                    ))}
                  </ul>
                </td>
                <td style={{ padding: '0.5rem' }}>${order.totalPrice.toFixed(2)}</td>
                <td style={{ padding: '0.5rem' }}>
                  <select 
                    value={order.orderStatus} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{ 
                      padding: '0.25rem', 
                      borderRadius: '0.25rem',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {validStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}