import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NetGram from "../assets/NetGram.svg";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Services", path: "/services" },
        { name: "Join Us", path: "/careers" },
        { name: "About", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Admin", path: "/adminLayout" },
    ];

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <h1 className="flex flex-col font-bold">
                        <span className="text-2xl headingn text-white font-extrabold tracking-wide font-serif relative">
                            NetGram
                        </span>
                        <span className="text-xs itname text-white tracking-wider mt-1 italic font-medium">
                            IT Solutions
                        </span>
                    </h1>

                    <img
                        src={NetGram}
                        alt="NetGram Logo"
                        className="h-14 w-auto object-contain"
                    />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-8 text-white font-medium text-lg">
                    {links.map((link) => (
                        <li key={link.name} className="relative group">
                            <Link
                                to={link.path}
                                className={`transition-colors duration-300 ${location.pathname === link.path
                                    ? "text-green-400 font-semibold"
                                    : "hover:text-green-200"
                                    }`}
                            >
                                {link.name}
                            </Link>
                            {/* Underline animation */}
                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-teal-400 transition-all duration-300 ${location.pathname === link.path
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 transform transition-transform duration-300 ease-in-out origin-top ${isOpen
                    ? "max-h-screen opacity-100 scale-y-100"
                    : "max-h-0 opacity-0 scale-y-0 overflow-hidden"
                    }`}
            >
                <ul className="flex flex-col gap-4 px-6 py-4 text-white font-medium text-lg">
                    {links.map((link) => (
                        <li key={link.name} className="relative group">
                            <Link
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`transition-colors duration-300 ${location.pathname === link.path
                                    ? "text-green-400 font-semibold"
                                    : "hover:text-green-200"
                                    }`}
                            >
                                {link.name}
                            </Link>
                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-teal-400 transition-all duration-300 ${location.pathname === link.path
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;