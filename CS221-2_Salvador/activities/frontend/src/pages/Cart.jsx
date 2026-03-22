import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import QuantitySelector from "../components/QuantitySelector";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Your cart is empty</h2>
          <Link to="/"><button style={{ marginTop: '1rem' }}>Browse Products</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Shopping Cart</h2>
      <div style={{ marginTop: '2rem' }}>
        {cartItems.map(item => (
          <div key={item.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <QuantitySelector 
                qty={item.qty} 
                onIncrease={() => updateQuantity(item.product, item.qty + 1)} 
                onDecrease={() => item.qty === 1 ? removeFromCart(item.product) : updateQuantity(item.product, item.qty - 1)} 
              />
              <button onClick={() => removeFromCart(item.product)} style={{ background: '#ef4444' }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <Link to="/checkout"><button style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Proceed to Checkout</button></Link>
      </div>
    </div>
    </div>
  );
}