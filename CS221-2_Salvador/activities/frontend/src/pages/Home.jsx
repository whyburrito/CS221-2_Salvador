import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
import QuantitySelector from "../components/QuantitySelector";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Our Products</h2>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="card">
            <img src={product.image || "https://via.placeholder.com/200"} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.9rem', marginBottom: '1rem' }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/product/${product._id}`}>
                <button style={{ background: 'var(--border)', color: 'var(--text)' }}>View</button>
              </Link>
              {(() => {
                const cartItem = cartItems.find(item => item.product === product._id);
                if (cartItem) {
                  return (
                    <QuantitySelector 
                      qty={cartItem.qty} 
                      onIncrease={() => updateQuantity(product._id, cartItem.qty + 1)} 
                      onDecrease={() => cartItem.qty === 1 ? removeFromCart(product._id) : updateQuantity(product._id, cartItem.qty - 1)} 
                      max={product.countInStock}
                    />
                  );
                }
                return (
                  <button onClick={() => user ? addToCart(product) : setIsAuthModalOpen(true)}>Add to Cart</button>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}