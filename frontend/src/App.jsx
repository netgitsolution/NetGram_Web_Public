import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/Home";
import PortfolioPage from "./pages/PortfolioPage";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import Career from "./pages/Career";

import AdminLayout from "./admin/AdminLayout";

const AppWrapper = () => {
  const location = useLocation();

  // Pages jaha navbar nahi chahiye
  const hideNavbarPaths = ["/adminLayout"];

  const isNavbarVisible = !hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // Pages jaha footer nahi chahiye
  const hideFooterPaths = ["/adminLayout"];

  const isFooterVisible = !hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {isNavbarVisible && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/adminLayout" element={<AdminLayout />} />
        {/* 404 Page Not Found */}
        <Route path="*" element={<div className="text-center py-16 text-2xl">404 - Page Not Found</div>} />
      </Routes>

      {isFooterVisible && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppWrapper />
    </Router>
  );
}

export default App;