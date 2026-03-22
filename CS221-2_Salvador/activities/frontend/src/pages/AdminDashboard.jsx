import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    countInStock: "",
    isFeatured: false
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/");
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId 
      ? `http://localhost:3000/api/products/${editingId}` 
      : "http://localhost:3000/api/products";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          description: formData.description,
          image: formData.image,
          countInStock: Number(formData.countInStock),
          isFeatured: formData.isFeatured
        })
      });

      if (res.ok) {
        setFormData({ name: "", price: "", description: "", image: "", countInStock: "", isFeatured: false });
        setEditingId(null);
        fetchProducts();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to save product");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      countInStock: product.countInStock,
      isFeatured: product.isFeatured || false
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", description: "", image: "", countInStock: "", isFeatured: false });
  };

  if (!user || user.role !== "Admin") return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Admin Dashboard</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" min="0" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Count In Stock</label>
            <input type="number" name="countInStock" value={formData.countInStock} onChange={handleInputChange} min="0" required />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} style={{ width: 'auto' }} />
            <label style={{ marginBottom: 0 }}>Featured Product</label>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : (editingId ? "Update Product" : "Add Product")}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} style={{ background: 'var(--border)', color: 'var(--text)' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Manage Products</h3>
        <div style={{ marginTop: '1rem' }}>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '0.5rem' }}>Name</th>
                  <th style={{ padding: '0.5rem' }}>Price</th>
                  <th style={{ padding: '0.5rem' }}>Stock</th>
                  <th style={{ padding: '0.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.5rem' }}>{product.name}</td>
                    <td style={{ padding: '0.5rem' }}>${product.price.toFixed(2)}</td>
                    <td style={{ padding: '0.5rem' }}>{product.countInStock}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <button 
                        onClick={() => handleEdit(product)} 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', marginRight: '0.5rem', background: '#3b82f6' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)} 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', background: '#ef4444' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}