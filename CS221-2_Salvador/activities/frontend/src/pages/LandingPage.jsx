import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";
import QuantitySelector from "../components/QuantitySelector";

export default function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3000/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data))
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);

  return (
    <div>
      {/* Hero Section - Breaking the constraints! */}
      <div className="hero-inazuma">
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            color: "white",
            textShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          Welcome to S-Retail Hub
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "600px",
            margin: "0 auto 2rem auto",
            textShadow: "0 1px 5px rgba(0,0,0,0.1)",
          }}
        >
          Discover our exclusive collection of premium products. Quality meets
          modern design.
        </p>
        <Link to="/products">
          <button className="btn-glow">Explore Collection</button>
        </Link>
      </div>

      {/* Featured Gallery */}
      <div className="container" style={{ marginTop: "3rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            fontSize: "2.5rem",
            color: "var(--primary)",
          }}
        >
          Featured Highlights
        </h2>
        {featuredProducts.length === 0 ? (
          <p
            style={{ textAlign: "center", color: "var(--text)", opacity: 0.7 }}
          >
            No featured products available at the moment.
          </p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="glass-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5rem",
                }}
              >
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  alt={product.name}
                  className="product-image"
                  style={{ borderRadius: "0.5rem" }}
                />
                <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                  {product.name}
                </h3>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "var(--primary)",
                    fontSize: "1.1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  ${product.price.toFixed(2)}
                </p>
                <p
                  style={{
                    color: "var(--text)",
                    opacity: 0.7,
                    fontSize: "0.9rem",
                    marginBottom: "1.5rem",
                    flexGrow: 1,
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    alignItems: "center",
                  }}
                >
                  <Link to={`/product/${product._id}`}>
                    <button
                      style={{
                        background: "transparent",
                        border: "1px solid var(--primary)",
                        color: "var(--primary)",
                      }}
                    >
                      View Details
                    </button>
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
        )}
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
