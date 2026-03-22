import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
import QuantitySelector from "../components/QuantitySelector";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container"><div style={{ padding: "4rem", textAlign: "center" }}>Loading product details...</div></div>;
  if (error) return <div className="container"><div style={{ padding: "4rem", textAlign: "center", color: "#ef4444" }}>{error}</div></div>;
  if (!product) return null;

  const cartItem = cartItems.find((item) => item.product === product._id);

  return (
    <div className="container">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
      <Link to="/products" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text)', textDecoration: 'underline' }}>
        &larr; Back to Shop
      </Link>
      
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', padding: '3rem' }}>
        {/* Left Column: Image */}
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.image || "https://via.placeholder.com/400"} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: 'auto', 
              aspectRatio: '1/1', 
              objectFit: 'cover', 
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }} 
          />
        </div>

        {/* Right Column: Details */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1.5rem' }}>
            ${product.price.toFixed(2)}
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text)', opacity: 0.8, lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '1rem', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              backgroundColor: product.countInStock > 0 ? '#10b981' : '#ef4444',
              color: 'white'
            }}>
              {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            {cartItem ? (
              <QuantitySelector 
                qty={cartItem.qty} 
                onIncrease={() => updateQuantity(product._id, cartItem.qty + 1)} 
                onDecrease={() => cartItem.qty === 1 ? removeFromCart(product._id) : updateQuantity(product._id, cartItem.qty - 1)} 
                max={product.countInStock}
              />
            ) : (
              <button 
                onClick={() => user ? addToCart(product) : setIsAuthModalOpen(true)}
                disabled={product.countInStock === 0}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  fontSize: '1.1rem',
                  borderRadius: '0.5rem'
                }}
              >
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
    </div>
  );
}