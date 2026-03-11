import AuthPage from "./pages/AuthPage.jsx";
import Inventory from "./pages/Inventory.jsx";
import Landing from "./pages/Landing.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/authPage" element={<AuthPage />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
