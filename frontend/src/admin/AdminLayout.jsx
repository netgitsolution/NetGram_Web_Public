import { useState } from "react";
import {
  Home,
  Briefcase,
  Wrench,
  Users,
  Info,
  LogOut,
  Menu,
  X,
  Layout,
  Columns,
} from "lucide-react";

import HomeAdmin from "./pages/HomeAdmin";
import PortfolioAdmin from "./pages/PortfolioAdmin";
import ServicesAdmin from "./pages/ServicesAdmin";
import JoinUsAdmin from "./pages/JoinUsAdmin";
import AboutUsAdmin from "./pages/AboutUsAdmin";
import FooterAdmin from "./pages/FooterAdmin";
import BlogAdmin from "./pages/BlogAdmin";

export default function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setMobileSidebarOpen(false);
  };

  // Sidebar links config (icons + labels)
  const navItems = [
    { label: "Home", icon: <Home size={20} /> },
    { label: "Portfolio", icon: <Briefcase size={20} /> },
    { label: "Services", icon: <Wrench size={20} /> },
    { label: "Join Us", icon: <Users size={20} /> },
    { label: "About", icon: <Info size={20} /> },
    { label: "Blog", icon: <Layout size={20} /> },
    { label: "Footer", icon: <Columns size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar (Desktop & Tablet) */}
      <aside
        className={`
          bg-gray-900 text-white flex flex-col transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-16"}
          hidden md:flex
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && <span className="text-2xl font-bold">Admin</span>}
          <button
            className="p-2 hover:bg-gray-700 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 p-4 space-y-2 overflow-auto">
          {navItems.map(({ label, icon }) => (
            <SidebarButton
              key={label}
              icon={icon}
              label={label}
              sidebarOpen={sidebarOpen}
              active={activeSection === label}
              onClick={() => handleSectionClick(label)}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className={`flex items-center gap-2 w-full p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all ${!sidebarOpen && "justify-center"
              }`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-gray-900 text-white w-64 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-2xl font-bold">Admin</span>
              <button
                className="p-2 hover:bg-gray-700 rounded-md"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-auto">
              {navItems.map(({ label, icon }) => (
                <SidebarButton
                  key={label}
                  icon={icon}
                  label={label}
                  sidebarOpen={true}
                  active={activeSection === label}
                  onClick={() => handleSectionClick(label)}
                />
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Transparent clickable background */}
          <div
            className="flex-1 bg-transparent"
            onClick={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="w-full bg-white shadow p-4 flex items-center md:hidden fixed top-0 left-0 right-0 z-40">
          {/* Sidebar Toggle Button */}
          <button
            className="p-2 hover:bg-gray-200 rounded-md"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Dashboard Title */}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
            Dashboard
          </h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto mt-14 md:mt-0">
          {activeSection === "Navbar" && <NavbarAdmin />}
          {activeSection === "Home" && <HomeAdmin />}
          {activeSection === "Portfolio" && <PortfolioAdmin />}
          {activeSection === "Services" && <ServicesAdmin />}
          {activeSection === "Join Us" && <JoinUsAdmin />}
          {activeSection === "About" && <AboutUsAdmin />}
          {activeSection === "Blog" && <BlogAdmin />}
          {activeSection === "Footer" && <FooterAdmin />}
        </main>
      </div>
    </div>
  );
}

// Sidebar Button Component
const SidebarButton = ({ icon, label, sidebarOpen, active, onClick }) => (
  <button
    className={`flex items-center gap-3 w-full p-2 rounded-lg transition-all ${active ? "bg-blue-600 hover:bg-blue-500" : "hover:bg-gray-700"
      } ${!sidebarOpen && "justify-center"}`}
    onClick={onClick}
  >
    {icon}
    {sidebarOpen && <span>{label}</span>}
  </button>
);
