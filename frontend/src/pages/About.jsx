import React, { useState, useRef } from "react";
import Dotted from "../components/Dotted";
import {
    FaBullseye,
    FaHandshake,
    FaRocket,
    FaLock,
    FaUser,
    FaRegEnvelope,
    FaComment,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaChartLine,
    FaPenNib,
    FaLaptopCode,
    FaPaintBrush,
    FaGraduationCap,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { sendContactRequest } from "../api/contactApi";

const AboutPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", number: "", message: "" });
    const [selectedService, setSelectedService] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const teamRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");
        if (!selectedService) {
            setErrorMsg("Please select a service!");
            return;
        }
        const payload = {
            your_name: formData.name,
            your_email: formData.email,
            your_number: formData.number,
            select_service: selectedService.label,
            your_message: formData.message,
        };
        try {
            setLoading(true);
            const res = await sendContactRequest(payload);
            setSuccessMsg(res.message || "Message sent successfully!");
            setFormData({ name: "", email: "", number: "", message: "" });
            setSelectedService(null);
        } catch (err) {
            setErrorMsg(err.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const coreValues = [
        { icon: <FaBullseye />, title: "Excellence", desc: "Delivering world-class IT solutions with precision." },
        { icon: <FaHandshake />, title: "Partnership", desc: "We collaborate with clients as trusted partners." },
        { icon: <FaRocket />, title: "Innovation", desc: "We innovate with modern technologies to stay ahead." },
        { icon: <FaLock />, title: "Integrity", desc: "Transparency and trust form the core of our work." },
    ];

    const services = [
        { label: "Digital Media Marketing", icon: <FaChartLine /> },
        { label: "Script & Content Writing", icon: <FaPenNib /> },
        { label: "Web Development", icon: <FaLaptopCode /> },
        { label: "Content Creation", icon: <FaPaintBrush /> },
        { label: "Training Services", icon: <FaGraduationCap /> },
    ];

    const teamMembers = [
        { name: "John Doe", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/men/32.jpg", linkedin: "#", twitter: "#" },
        { name: "Jane Smith", role: "Head of Marketing", img: "https://randomuser.me/api/portraits/women/44.jpg", linkedin: "#", twitter: "#" },
        { name: "Mike Johnson", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/56.jpg", linkedin: "#", twitter: "#" },
        { name: "Alice Brown", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/65.jpg", linkedin: "#", twitter: "#" },
        { name: "Bob White", role: "Marketing Analyst", img: "https://randomuser.me/api/portraits/men/72.jpg", linkedin: "#", twitter: "#" },
    ];

    const scrollToContact = () => {
        document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });
    };

    const scrollTeam = (direction) => {
        if (teamRef.current) {
            // 3 card width scroll karne ke liye
            const card = teamRef.current.querySelector("div"); // first card
            if (!card) return;

            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight); // width + gap
            const scrollAmount = cardWidth * 1; // scroll 3 cards at a time

            teamRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };


    return (
        <div className="relative bg-gray-50 min-h-screen overflow-hidden">
            <Dotted />

            {/* Hero Section */}
            <section className="relative py-28 text-white flex justify-center items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-center relative z-10">
                    <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-12 text-center shadow-lg">
                        <h1 className="text-5xl font-extrabold mb-4">NetGram IT Solutions</h1>
                        <p className="text-gray-200 text-xl max-w-3xl mx-auto mb-8">
                            Bridging the gap between traditional businesses and modern digital transformation.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={scrollToContact}
                                className="px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-emerald-600 transition"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story + Mission + Values */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg space-y-6">
                    <h2 className="text-3xl font-bold text-gray-100">Our Story</h2>
                    <p className="text-gray-200">
                        Founded with a vision to transform businesses with IT solutions,
                        NetGram provides services in web development, marketing, and digital growth.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-100 mt-6">Our Mission</h2>
                    <p className="text-gray-200">
                        To deliver cutting-edge IT services that empower businesses globally.
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Core Values</h2>
                    <ul className="space-y-6">
                        {coreValues.map((val, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="text-emerald-400 text-xl mt-1">{val.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-100">{val.title}</h3>
                                    <p className="text-gray-200">{val.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">Meet Our Team</h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Our dedicated professionals are here to help your business grow.
                    </p>
                </div>

                <div className="relative">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scrollTeam("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition hidden md:flex"
                    >
                        <FaChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                        onClick={() => scrollTeam("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition hidden md:flex"
                    >
                        <FaChevronRight size={20} className="text-white" />
                    </button>

                    {/* Team Carousel */}
                    <div ref={teamRef} className="flex gap-6 overflow-x-auto scroll-smooth px-2 md:px-6 scrollbar-hide">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="flex-shrink-0 w-[90%] sm:w-[45%] md:w-[30%] bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg text-center"
                            >
                                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-100">{member.name}</h3>
                                <p className="text-gray-400 mb-4">{member.role}</p>
                                <div className="flex justify-center gap-4 text-gray-200">
                                    <a href={member.linkedin} className="hover:text-emerald-400 transition transform hover:scale-110">
                                        <FaLinkedin size={20} />
                                    </a>
                                    <a href={member.twitter} className="hover:text-emerald-400 transition transform hover:scale-110">
                                        <FaTwitter size={20} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact-section" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">Contact Us</h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Have questions or want to work with us? Fill out the form or reach us directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-100">Get In Touch</h2>
                        {successMsg && <p className="text-green-400 text-center mb-3">{successMsg}</p>}
                        {errorMsg && <p className="text-red-400 text-center mb-3">{errorMsg}</p>}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="relative">
                                <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <FaRegEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <FaPhoneAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="tel"
                                    name="number"
                                    value={formData.number || ""}
                                    onChange={handleChange}
                                    placeholder="Your Phone Number"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Dropdown */}
                            <div className="relative">
                                <FaComment className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <div
                                    className="w-full px-10 py-3 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-white/5 transition bg-transparent text-white"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedService ? selectedService.icon : null}
                                        <span>{selectedService ? selectedService.label : "Select a service"}</span>
                                    </div>
                                    <span>{dropdownOpen ? "▲" : "▼"}</span>
                                </div>
                                {dropdownOpen && (
                                    <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto text-gray-800">
                                        {services.map((service) => (
                                            <li
                                                key={service.label}
                                                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                {service.icon}
                                                <span>{service.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <FaComment className="absolute top-2 left-3 text-gray-300" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    rows={5}
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-600 transition disabled:opacity-50"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-8">
                        {/* Contact Info */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-100">Contact Information</h2>
                            <ul className="space-y-4 text-gray-200">
                                <li>
                                    <a
                                        href="tel:+912913160994"
                                        className="flex items-center gap-3 text-gray-200 hover:text-emerald-400 transition"
                                    >
                                        <FaPhoneAlt className="text-emerald-400 flex-shrink-0" />
                                        <span className="truncate">+91 2913160994</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:netgitsolution@gmail.com"
                                        className="flex items-center gap-3 text-gray-200 hover:text-emerald-400 transition"
                                    >
                                        <FaEnvelope className="text-emerald-400 flex-shrink-0" />
                                        <span className="truncate">NETGITSOLUTION@gmail.com</span>
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-emerald-400 flex-shrink-0" />
                                    <span className="truncate">
                                        304, Modi Arcade, Jodhpur, Rajasthan, India
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-100">Business Hours</h2>
                            <ul className="space-y-2 text-gray-200">
                                <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
                                <li>Saturday: 10:00 AM - 4:00 PM</li>
                                <li>Sunday: Closed</li>
                            </ul>
                        </div>

                        {/* Follow Us */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-100">Follow Us</h2>
                            <div className="flex gap-6 text-gray-200">
                                <a href="#" className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaLinkedin size={24} />
                                </a>
                                <a href="#" className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="#" className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaFacebook size={24} />
                                </a>
                                <a href="#" className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaInstagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;