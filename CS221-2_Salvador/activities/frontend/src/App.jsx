import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AuthPage from "./pages/AuthPage";
import OrderHistory from "./pages/OrderHistory";

import AdminDashboard from "./pages/AdminDashboard";
import OrderManager from "./pages/OrderManager";

import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Customer Routes with Header and Footer */}
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/authPage" element={<AuthPage />} />
              </Route>

              {/* Admin Routes with Side Navigation */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="products" replace />} />
                <Route path="products" element={<AdminDashboard />} />
                <Route path="orders" element={<OrderManager />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;