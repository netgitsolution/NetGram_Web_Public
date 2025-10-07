import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NetGramLogo from "../assets/NetGram.svg";
import { getFooterData } from "../api/footerApi";

const Footer = () => {
    const location = useLocation();

    // ------------------- EMPTY FALLBACK -------------------
    const emptyData = {
        heading_text: "",
        phone_number: "",
        email: "",
        address: ""
    };

    // ------------------- STATES -------------------
    const [headingText, setHeadingText] = useState(emptyData.heading_text);
    const [phoneNumber, setPhoneNumber] = useState(emptyData.phone_number);
    const [email, setEmail] = useState(emptyData.email);
    const [address, setAddress] = useState(emptyData.address);

    // ------------------- FETCH FOOTER DATA -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getFooterData(); // API call
                if (res && res.length > 0) {
                    const data = res[0]; // assuming API returns array
                    setHeadingText(data.heading_text || "");
                    setPhoneNumber(data.phone_number || "");
                    setEmail(data.email || "");
                    setAddress(data.address || "");
                }
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchData();
    }, []);

    // ------------------- QUICK LINKS -------------------
    const links = [
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Services", path: "/services" },
        { name: "Join Us", path: "/JoinUs" },
        { name: "About", path: "/about" },
    ];

    return (
        <footer className="relative bg-[#192335] overflow-hidden">
            <div className="relative z-10 max-w-8xl mx-auto 
                      px-4 sm:px-6 md:px-8 lg:px-12 
                      py-8 sm:py-10 md:py-12 
                      bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">

                {/* Flex Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8 mb-8">

                    {/* Left: Company Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-1/3">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex flex-col">
                                <h2 className="text-xl sm:text-2xl headingn font-bold text-white">NetGram</h2>
                                <p className="text-gray-200 text-sm itname sm:text-base">IT Solutions</p>
                            </div>
                            <img src={NetGramLogo} alt="NetGram Logo" className="w-14 h-14 sm:w-16 sm:h-16" />
                        </div>
                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                            {headingText}
                        </p>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 text-center">Quick Links</h3>
                            <ul className="space-y-2 text-center">
                                {links.map((link) => (
                                    <li key={link.name} className="relative group">
                                        <Link
                                            to={link.path}
                                            className={`transition-colors duration-300 ${location.pathname === link.path
                                                ? "text-green-400 font-semibold"
                                                : "text-white hover:text-green-200"
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
                    </div>

                    {/* Right: Contact Info */}
                    <div className="flex flex-col items-center md:items-end w-full md:w-1/3">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-200 text-center md:text-right text-sm sm:text-base">
                            <li>📞 {phoneNumber || "+91 2913160994"}</li>
                            <li>✉️ {email || "NETGITSOLUTION@gmail.com"}</li>
                            <li>
                                📍 {address || "304, 3rd floor, Modi arcade, near Bombay Motor Circle, Jodhpur-342003, Rajasthan"}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="text-center pt-6 border-t border-white/20 text-xs sm:text-sm md:text-base text-gray-300">
                    © {new Date().getFullYear()} <span className="font-semibold text-white">NetGram</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;