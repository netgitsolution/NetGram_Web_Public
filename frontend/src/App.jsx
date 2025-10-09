import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import HomePage from "./pages/Home";
import PortfolioPage from "./pages/PortfolioPage";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import JoinUs from "./pages/JoinUs";
import Blog from "./pages/Blog";

// Admin Pages
import LoginAdmin from "./admin/pages/LoginAdmin";
import AdminLayout from "./admin/AdminLayout";

// 🔹 Wrapper for Navbar & Footer Visibility
const AppWrapper = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const location = useLocation();

  // Pages jaha Navbar/Footer nahi dikhna
  const hidePaths = ["/adminLayout", "/adminLogin"];

  const isNavbarVisible = !hidePaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const isFooterVisible = !hidePaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {isNavbarVisible && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/joinUs" element={<JoinUs />} />
        <Route path="/blog" element={<Blog />} />

        {/* Admin Login */}
        <Route path="/adminLogin" element={<LoginAdmin onLogin={handleLogin} />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/adminLayout"
          element={
            isLoggedIn ? (
              <AdminLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/adminLogin" replace />
            )
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="text-center py-16 text-2xl font-semibold text-gray-700">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>

      {isFooterVisible && <Footer />}
    </>
  );
};

// 🔹 Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fake Login Validation
  const handleLogin = (username, password) => {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("❌ Invalid credentials");
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <AppWrapper
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

export default App;